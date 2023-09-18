import type http from 'http';
import { Server } from 'socket.io';
import type { OnlineGameProp } from './utils/types/types';

type ServerT = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

const { WEBSITE_URL } = process.env;
const games: OnlineGameProp[] = [];

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

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    console.log(io.sockets.adapter.rooms);

    socket.on('create-game', ({ newGameId, name }) => {
      socket.join(newGameId);
      games.push({
        gameId: newGameId,
        playerOne: { name, id: socket.id },
        playerTwo: { name: '', id: '' },
        readyCount: 0,
        isOver: false,
      });
    });

    socket.on('close-game', ({ gameId }) => {
      const gameToClose = findCurrentGame(gameId, games);

      if (!gameToClose) {
        socket.emit('game-error', { msg: 'room not found' });
        return;
      }

      if (gameToClose.playerOne.id === socket.id) {
        games.splice(games.indexOf(gameToClose), 1);
        socket.leave(gameId);
      } else {
        socket.emit('game-error', { msg: 'You can not close this room' });
      }
    });

    socket.on('join-game', ({ gameId, name }) => {
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

      if (game.playerOne.name === name) {
        return socket.emit('game-error', { msg: 'Name already taken' });
      }

      socket.join(gameId);

      game.playerTwo = { name, id: socket.id };

      return io.to(gameId).emit('user-joined', game);
    });

    socket.on('ready-game', ({ gameId }) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;

      if (game.readyCount === 1) {
        game.readyCount = 0;
        io.to(gameId).emit('game-started');
      } else {
        game.readyCount += 1;
      }
    });

    socket.on('ready-round', ({ gameId }) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;

      if (game.readyCount === 1) {
        game.readyCount = 0;
        io.to(gameId).emit('round-started');
      } else {
        game.readyCount += 1;
      }
    });

    socket.on('game-move', ({ board, playerTurn, gameId }) => {
      io.to(gameId).emit('game-updated', { board, playerTurn });
    });

    socket.on(
      'round-over',
      ({ winner, winningPattern, isTie, gameId, winnerByTime }) => {
        if (winnerByTime) {
          io.to(gameId).emit('listen-round-over', {
            winner: winnerByTime,
            byTime: true,
          });
        } else {
          io.to(gameId).emit('listen-round-over', {
            winner,
            winningPattern,
            isTie,
          });
        }
      }
    );

    socket.on('game-rematch', ({ gameId }) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;

      if (game.readyCount === 1) {
        game.readyCount = 0;
        game.isOver = false;
        io.to(gameId).emit('listen-game-rematch');
      } else {
        game.readyCount += 1;
      }
    });

    socket.on('game-over', ({ winner, gameId }) => {
      const game = findCurrentGame(gameId, games);
      if (!game) return;
      game.isOver = true;
      if (winner === 'O') {
        io.to(gameId).emit('listen-game-over', {
          winner: game?.playerTwo,
        });
      } else if (winner === 'X') {
        io.to(gameId).emit('listen-game-over', {
          winner: game?.playerOne,
        });
      } else io.to(gameId).emit('listen-game-over', { isTie: true });
    });

    socket.on('disconnect', () => {
      games.find((game) => {
        const { playerOne, playerTwo } = game;
        games.splice(games.indexOf(game), 1);
        if (game.isOver) return true;

        if (playerOne.id === socket.id) {
          io.to(playerTwo.id).emit('listen-game-canceled', {
            opponent: playerOne,
          });
        }
        if (playerTwo.id === socket.id) {
          io.to(playerOne.id).emit('listen-game-canceled', {
            opponent: playerTwo,
          });
        }
        return true;
      });

      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
