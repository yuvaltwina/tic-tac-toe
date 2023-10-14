import { useEffect, useState, useRef } from 'react';
import { BoardValues, BoardValuesEnum } from '../../../types/BoardValues';
import useOnlineGameContext from '../context/useOnlineGameContext';

const { XSign, OSign } = BoardValuesEnum;

const startingScores = { xScore: 0, oScore: 0, tie: 0 };

const roundsNumber = 3;

function useGameStatus() {
  const {
    socket,
    gameOver,
    setGameOver,
    resetBoard,
    currentGameInfo: { gameId },
  } = useOnlineGameContext();
  const [endGameMessage, setEndGameMessage] = useState({
    hidden: false,
    buttonText: 'Ready',
    headerText: 'Are you ready?',
    mainText: '',
    onClick: () => {
      socket?.emit('ready-game', { gameId });
      setEndGameMessage((prev) => ({
        ...prev,
        headerText: 'Waiting for the opponent',
        buttonText: '',
      }));
    },
  });

  const [scores, setScores] = useState(startingScores);
  const gameNumber = useRef(0);

  useEffect(() => {
    socket?.on(
      'listen-round-over',
      ({ winner, winningPattern, isTie, byTime }) => {
        gameNumber.current += 1;
        const OWins = winner === OSign;
        const XWins = winner === XSign;

        // end game

        setGameOver({
          isOver: true,
          winningPattern,
          isTie,
        });

        // update score

        if (winner) {
          if (OWins) {
            setScores((prev) => ({ ...prev, oScore: prev.oScore + 1 }));
          }
          if (XWins) {
            setScores((prev) => ({ ...prev, xScore: prev.xScore + 1 }));
          }
        } else if (isTie) {
          setScores((prev) => ({ ...prev, tie: prev.tie + 1 }));
        }

        // generate proper message

        const messageText = () => {
          if (isTie) {
            return 'its a tie !!';
          }
          if (winner) {
            return `${winner} won round ${gameNumber.current}
           ${byTime ? 'by time' : ''}`;
          }
          return '';
        };

        setEndGameMessage({
          hidden: true,
          buttonText: 'Ready',
          headerText: messageText(),
          mainText: `are you ready for round number ${gameNumber.current + 1}?`,
          onClick: () => {
            socket?.emit('ready-round', { gameId });
            setEndGameMessage((prev) => ({
              ...prev,
              headerText: 'Waiting for the opponent',
              mainText: '',
              buttonText: '',
            }));
          },
        });
      }
    );

    return () => {
      socket?.off('listen-round-over');
    };
  }, [socket, gameId, setGameOver]);

  useEffect(() => {
    socket?.on('game-started', () => {
      setGameOver({
        isOver: false,
        winningPattern: [0, 0, 0],
        isTie: false,
      });
      setEndGameMessage((prev) => ({
        ...prev,
        buttonText: '',
        headerText: '',
        mainText: '',
      }));
    });

    socket?.on('round-started', () => {
      setGameOver({
        isOver: false,
        winningPattern: [0, 0, 0],
        isTie: false,
      });
      resetBoard();
    });

    return () => {
      socket?.off('game-started');
      socket?.off('round-started');
    };
  }, [socket, setGameOver, resetBoard]);

  useEffect(() => {
    if (gameNumber.current === roundsNumber) {
      setEndGameMessage((prev) => ({
        ...prev,
        hidden: false,
        headerText: '',
        mainText: '',
        buttonText: '',
      }));

      const { oScore, xScore } = scores;
      let finalWinner: BoardValues = '';
      if (xScore > oScore) {
        finalWinner = XSign;
      } else if (oScore > xScore) {
        finalWinner = OSign;
      }

      socket?.emit('game-over', { gameId, winner: finalWinner, scores });
    }
  }, [scores, gameId, socket]);

  useEffect(() => {
    socket?.on('listen-game-rematch', () => {
      setGameOver({
        isOver: false,
        winningPattern: [0, 0, 0],
        isTie: false,
      });
      resetBoard();
      setScores(startingScores);
      gameNumber.current = 0;
    });

    return () => {
      socket?.off('listen-game-rematch');
    };
  }, [socket, resetBoard, setGameOver]);

  return {
    scores,
    gameOver,
    endGameMessage,
    setGameOver,
  };
}

export default useGameStatus;
