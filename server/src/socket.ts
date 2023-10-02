import type http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import CustomError from './errors/CustomError';
import { decodeLoginCookieToken } from './utils/jwt';
import { NOT_AUTHORIZED_MESSAGE } from './utils/data/consts';
import { getUserDetailsFromDB } from './db/database';
import type { OnlineGameProp } from './utils/types/types';

type ServerT = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

const { WEBSITE_URL } = process.env;
const games: OnlineGameProp[] = [];
let openOnlineRoom: OnlineGameProp | any = {};

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

  io.use((currentSocket, next) => {
    const socket = currentSocket;
    const authorizationHeader = socket.handshake.headers?.authorization;

    if (!authorizationHeader) {
      next(new CustomError(401, NOT_AUTHORIZED_MESSAGE));
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    const username = decodeLoginCookieToken(token);
    if (username) {
      socket.data.username = username;
      next();
    } else {
      next(new CustomError(401, NOT_AUTHORIZED_MESSAGE));
    }
  });

  io.on('connection', (socket) => {
    const connectedSocketUserName = socket.data.username;
    const connectedSocketUserId = socket.id;

    const readyGame = (
      gameId: string,
      emitId: string,
      gameOver: boolean = true
    ) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;

      if (game.readyCount === 1) {
        game.readyCount = 0;
        game.isOver = gameOver;
        io.to(gameId).emit(emitId);
      } else {
        game.readyCount += 1;
      }
    };

    console.log(`User connected: ${connectedSocketUserId}`);
    console.log(io.sockets.adapter.rooms);

    socket.on('send-message', ({ message, gameId }) => {
      io.to(gameId).emit('received-message', {
        message,
        playerId: connectedSocketUserId,
      });
    });

    socket.on('open-online-room', async () => {
      const roomId = uuidv4();

      const playerDetails = await getUserDetailsFromDB(connectedSocketUserName);

      if (!playerDetails) {
        socket.emit('game-error', { msg: 'username not exist' });
        return;
      }

      const { image_id, points, username } = playerDetails;

      const joinOnlineGame = () => {
        const room = openOnlineRoom;
        socket.join(room.gameId);
        room.playerTwo = {
          name: username,
          points,
          image_id,
          id: connectedSocketUserId,
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
            image_id,
            id: connectedSocketUserId,
          },
          playerTwo: {
            name: '',
            points: 0,
            image_id: 0,
            id: '',
          },
          readyCount: 0,
          isOver: false,
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

      const playerDetails = await getUserDetailsFromDB(connectedSocketUserName);

      if (!playerDetails) {
        socket.emit('game-error', { msg: 'username not exist' });
        return;
      }

      const { username, points, image_id } = playerDetails;
      socket.join(roomId);
      games.push({
        gameId: roomId,
        playerOne: {
          name: username,
          points,
          image_id,
          id: connectedSocketUserId,
        },
        playerTwo: { name: '', points: 0, image_id: 0, id: '' },
        readyCount: 0,
        isOver: false,
      });

      io.to(roomId).emit('room-created', roomId);
    });

    socket.on('close-game', ({ gameId }) => {
      const gameToClose = findCurrentGame(gameId, games);

      if (!gameToClose) {
        socket.emit('game-error', { msg: 'room not found' });
        return;
      }

      if (gameToClose.playerOne.id === connectedSocketUserId) {
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

      const playerDetails = await getUserDetailsFromDB(connectedSocketUserName);

      if (!playerDetails) {
        return socket.emit('game-error', { msg: 'username not exist' });
      }

      const { username, points, image_id } = playerDetails;
      socket.join(gameId);
      game.playerTwo = {
        name: username,
        points,
        image_id,
        id: connectedSocketUserId,
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
      readyGame(gameId, 'listen-game-rematch', false);
    });

    socket.on('game-over', ({ winner, gameId }) => {
      const game = findCurrentGame(gameId, games);

      if (!game) return;

      game.isOver = true;

      if (winner === 'O') {
        io.to(gameId).emit('listen-game-over', {
          winner: game.playerTwo,
        });
      } else if (winner === 'X') {
        io.to(gameId).emit('listen-game-over', {
          winner: game.playerOne,
        });
      } else io.to(gameId).emit('listen-game-over', { isTie: true });
    });

    socket.on('disconnect', () => {
      const closeOnlineGame = () => {
        if (
          openOnlineRoom.gameId &&
          (openOnlineRoom.playerOne.id === connectedSocketUserId ||
            openOnlineRoom.playerTwo.id === connectedSocketUserId)
        ) {
          openOnlineRoom = {};
        }
      };

      const closeCostumeOnlineGame = () => {
        games.find((game) => {
          const { playerOne, playerTwo } = game;
          games.splice(games.indexOf(game), 1);
          if (game.isOver) return true;

          //לשמור את המאצ

          if (playerOne.id === connectedSocketUserId) {
            io.to(playerTwo.id).emit('listen-game-canceled', {
              opponent: playerOne,
            });
          }
          if (playerTwo.id === connectedSocketUserId) {
            io.to(playerOne.id).emit('listen-game-canceled', {
              opponent: playerTwo,
            });
          }
          return true;
        });
      };

      closeOnlineGame();

      closeCostumeOnlineGame();

      console.log(`User disconnected: ${connectedSocketUserId}`);
    });
  });
}
