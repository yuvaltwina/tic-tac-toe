/* eslint-disable no-param-reassign */
import type http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { decodeLoginToken } from './utils/jwt';
import { getUserDetailsFromDB, updateUserConnectedStatus } from './db/database';
import type { OnlineGameProp, Scores } from './utils/types/types';
import { saveMatchResults } from './utils/data/functions';

type ServerT = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;
type GameWinner = 0 | 1 | 2;
const { WEBSITE_URL } = process.env;
const games: OnlineGameProp[] = [];
let openOnlineRoom: OnlineGameProp | any = {};

const playerDefualtDetails = {
  name: '',
  points: 0,
  imageId: 0,
  socketId: '',
  userId: null,
};

const errorMessages = {
  badToken: 'Not A Valid Token',
  cantFindUser: 'Cant Find User in DB',
  doubleLogin: 'User Already Connected',
  cantUpdateConnectedStatus: 'Something Went Wrong',
};

const findCurrentGame = (gameId: string, gamesArr: typeof games) => {
  const game = gamesArr.find((game) => game.gameId === gameId);
  return game;
};

export default function setupSocket(server: ServerT) {
  const io = new Server(server, {
    cors: {
      origin: WEBSITE_URL,
    },
  });

  io.use(async (socket, next) => {
    const authorizationHeader = socket.handshake.headers?.authorization;

    if (!authorizationHeader) {
      next(new Error(errorMessages.badToken)); return;
    }
    const token = authorizationHeader.split(' ')[1];
    const tokenUsername = decodeLoginToken(token);

    if (!tokenUsername) {
      next(new Error(errorMessages.badToken)); return;
    }
    const user = await getUserDetailsFromDB(tokenUsername);

    if (!user) {
      next(new Error(errorMessages.cantFindUser)); return;
    }
    const { user_id, image_id, username, points, is_connected_to_socket } =
      user;

    if (is_connected_to_socket) {
      next(new Error(errorMessages.doubleLogin)); return;
    }
    try {
      await updateUserConnectedStatus(username, true);
    } catch {
      next(new Error(errorMessages.cantUpdateConnectedStatus)); return;
    }
    socket.data.playerDetails = {
      userId: user_id,
      imageId: image_id,
      username,
      points,
    };
    next();
  });

  io.on('connection', (socket) => {
    const connectedSocketUserId = socket.id;
    const { userId, imageId, username, points } = socket.data.playerDetails;

    const readyGame = (gameId: string, emitId: string) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;

      if (game.readyCount === 1) {
        game.readyCount = 0;
        game.isGameOver = false;
        io.to(gameId).emit(emitId);
      } else {
        game.readyCount += 1;
      }
    };

    socket.on('send-message', ({ message, gameId }) => {
      io.to(gameId).emit('received-message', {
        message,
        playerId: connectedSocketUserId,
      });
    });

    socket.on('open-online-room', async () => {
      const roomId = uuidv4();

      const joinOnlineGame = () => {
        const room = openOnlineRoom;
        socket.join(room.gameId);
        room.playerTwo = {
          name: username,
          points,
          imageId,
          socketId: connectedSocketUserId,
          userId,
        };

        games.push(room);
        openOnlineRoom = {};

        io.to(room.gameId).emit('user-joined', room);
      };

      const createOnlineGame = () => {
        openOnlineRoom = {
          gameId: roomId,
          playerOne: {
            name: username,
            points,
            imageId,
            socketId: connectedSocketUserId,
            userId,
          },
          playerTwo: playerDefualtDetails,
          readyCount: 0,
          isGameOver: false,
        };

        socket.join(roomId);
      };

      if (openOnlineRoom.gameId) {
        joinOnlineGame();
      } else {
        createOnlineGame();
      }
    });

    socket.on('create-game', async () => {
      const roomId = uuidv4();

      socket.join(roomId);
      games.push({
        gameId: roomId,
        playerOne: {
          name: username,
          points,
          imageId,
          socketId: connectedSocketUserId,
          userId,
        },
        playerTwo: playerDefualtDetails,
        readyCount: 0,
        isGameOver: false,
      });

      io.to(roomId).emit('room-created', roomId);
    });

    socket.on('close-game', ({ gameId }) => {
      const gameToClose = findCurrentGame(gameId, games);

      if (!gameToClose) {
        socket.emit('game-error', { msg: 'room not found' });
        return;
      }

      if (gameToClose.playerOne.socketId === connectedSocketUserId) {
        games.splice(games.indexOf(gameToClose), 1);
        socket.leave(gameId);
      } else {
        socket.emit('game-error', { msg: 'You can not close this room' });
      }
    });

    socket.on('join-game', async ({ gameId }) => {
      const room = io.sockets.adapter.rooms.get(gameId);
      const game = findCurrentGame(gameId, games);

      if (!room || !game) {
        return socket.emit('game-error', {
          msg: `Game "${gameId}" does not exist`,
        });
      }

      if (room.size >= 2) {
        return socket.emit('game-error', { msg: 'Game is full' });
      }

      socket.join(gameId);
      game.playerTwo = {
        name: username,
        points,
        imageId,
        socketId: connectedSocketUserId,
        userId,
      };

      return io.to(gameId).emit('user-joined', game);
    });

    socket.on('ready-game', ({ gameId }) => {
      readyGame(gameId, 'game-started');
    });

    socket.on('ready-round', ({ gameId }) => {
      readyGame(gameId, 'round-started');
    });

    socket.on('game-move', ({ board, playerTurn, gameId }) => {
      io.to(gameId).emit('game-updated', { board, playerTurn });
    });

    socket.on(
      'round-over',
      ({ winner, winningPattern, isTie, gameId, winnerByTime }) => {
        const roundOverData = {
          ...(winnerByTime && {
            winner: winnerByTime,
            byTime: true,
          }),
          ...(!winnerByTime && { winner, winningPattern, isTie }),
        };

        io.to(gameId).emit('listen-round-over', roundOverData);
      }
    );

    socket.on('game-rematch', ({ gameId }) => {
      readyGame(gameId, 'listen-game-rematch');
    });

    socket.on('game-over', async ({ winner, gameId, scores }) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;
      const { playerOne, playerTwo } = game;
      let gameWinner: GameWinner = 0;
      game.isGameOver = true;
      if (winner === 'O') {
        gameWinner = 2;
        io.to(gameId).emit('listen-game-over', {
          winner: playerTwo,
        });
      } else if (winner === 'X') {
        gameWinner = 1;
        io.to(gameId).emit('listen-game-over', {
          winner: playerOne,
        });
      } else io.to(gameId).emit('listen-game-over', { isTie: true });

      if (playerOne.socketId === socket.id) {
        await saveMatchResults(
          playerOne.name,
          playerTwo.name,
          gameWinner,
          scores
        );
      }
    });

    socket.on('disconnect', async () => {
      const closeOnlineGame = () => {
        if (
          openOnlineRoom.gameId &&
          (openOnlineRoom.playerOne.socketId === connectedSocketUserId ||
            openOnlineRoom.playerTwo.socketId === connectedSocketUserId)
        ) {
          openOnlineRoom = {};
        }
      };

      const closeCostumeOnlineGame = () => {
        games.find(async (game) => {
          const { playerOne, playerTwo } = game;
          games.splice(games.indexOf(game), 1);
          let gameWinner: GameWinner;
          if (game.isGameOver) return true;
          if (playerOne.socketId === connectedSocketUserId) {
            gameWinner = 1;
            io.to(playerTwo.socketId).emit('listen-game-canceled', {
              opponent: playerOne,
            });
          } else {
            gameWinner = 2;
            io.to(playerOne.socketId).emit('listen-game-canceled', {
              opponent: playerTwo,
            });
          }
          const defualtDiscconectedScores: Scores = {
            oScore: 0,
            xScore: 0,
            tie: 0,
          };
          const gameCanceled = true;
          await saveMatchResults(
            playerOne.name,
            playerTwo.name,
            gameWinner,
            defualtDiscconectedScores,
            gameCanceled
          );
          return true;
        });
      };

      closeOnlineGame();

      closeCostumeOnlineGame();
      try {
        await updateUserConnectedStatus(username, false);
      } catch {
        console.log('coudlnt update user connection to false');
      }

      console.log(`User disconnected: ${connectedSocketUserId}`);
    });
  });
}
