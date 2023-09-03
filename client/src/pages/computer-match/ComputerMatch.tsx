/* eslint consistent-return: 0 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Board from '../../components/tic-tac-toe-board/Board';
import BoardScore from '../../components/tic-tac-toe-board/BoardScore';
import ResetButton from '../../components/tic-tac-toe-board/ResetButton';
import BoardValues from '../../types/BoardValues';
import { WIN_CONDITIONS } from '../../utils/data';
import './ComputerMatch.scss';

function randomEmptyIndex(arr: string[]) {
  const emptyIndices = arr.reduce((indices, val, index) => {
    if (val === '') {
      indices.push(index);
    }
    return indices;
  }, []);

  if (emptyIndices.length > 0) {
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    return randomIndex;
  }
  return null;
}

const startingScores = { xScore: 0, oScore: 0, tie: 0 };

const checkWinner = (board: BoardValues[]) => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x, y, z] = WIN_CONDITIONS[i];

    if (board[x] && board[x] === board[y] && board[y] === board[z]) {
      return { winner: board[x], winPattern: WIN_CONDITIONS[i] };
    }
  }
  return { winner: undefined, winPattern: undefined };
};
const defaultSquares = new Array(9).fill('');

function ComputerMatch() {
  const actionCounter = useRef(0);
  const isWinnerAvailable = actionCounter.current >= 4;
  const isTieAvailable = actionCounter.current >= 8;

  const [xPlaying, setXPlaying] = useState(true);

  const [board, setBoard] = useState<BoardValues[]>(defaultSquares);
  const [gameOver, setGameOver] = useState({
    isOver: false,
    winningPattern: [0, 0, 0],
    isTie: false,
  });

  const [scores, setScores] = useState(startingScores);
  const [computerMode, setComputerMode] = useState({
    turn: false,
    active: false,
  });

  const setWinPattern = useCallback(
    (pattern: number[] | undefined) => {
      if (pattern) {
        setGameOver((prev) => ({
          ...prev,
          isOver: true,
          winningPattern: pattern,
        }));
      } else if (isTieAvailable) {
        setGameOver((prev) => ({
          ...prev,
          isOver: true,
          isTie: true,
        }));
      }
    },
    [isTieAvailable]
  );

  const updateGameScore = useCallback(
    (winner: BoardValues | undefined) => {
      if (winner) {
        if (winner === 'O') {
          setScores((prev) => ({ ...prev, oScore: prev.oScore + 1 }));
        }
        if (winner === 'X') {
          setScores((prev) => ({ ...prev, xScore: prev.xScore + 1 }));
        }
      } else if (isTieAvailable) {
        setScores((prev) => ({ ...prev, tie: prev.tie + 1 }));
      }
    },
    [isTieAvailable]
  );

  const handleCellClick = useCallback(
    (cellIndex: number) => {
      actionCounter.current += 1;

      // update the board
      const updateBoard = board.map((value, boardIndex) => {
        if (boardIndex === cellIndex) {
          return xPlaying === true ? 'X' : 'O';
        }
        return value;
      });
      setBoard(updateBoard);

      // change player
      setXPlaying((prev) => !prev);

      // check for winner
      if (isWinnerAvailable) {
        const { winner, winPattern } = checkWinner(updateBoard);
        updateGameScore(winner);
        setWinPattern(winPattern);
      }

      if (computerMode.active) {
        setComputerMode((prev) => ({ ...prev, turn: !prev.turn }));
      }
    },
    [
      xPlaying,
      board,
      updateGameScore,
      computerMode,
      isWinnerAvailable,
      setWinPattern,
    ]
  );

  const resetBoard = () => {
    setGameOver({
      isOver: false,
      winningPattern: [0, 0, 0],
      isTie: false,
    });
    actionCounter.current = 0;
    setBoard(defaultSquares);
  };

  const resetScores = () => {
    setScores(startingScores);
  };

  const switchMode = () => {
    resetBoard();
    setComputerMode((prev) => ({
      active: !prev.active,
      turn: false,
    }));
    resetScores();
  };

  useEffect(() => {
    const isComputerTurnValid =
      computerMode.active &&
      computerMode.turn &&
      !gameOver.isOver &&
      !gameOver.isTie;

    if (isComputerTurnValid) {
      const randomCell = randomEmptyIndex(board)!;
      handleCellClick(randomCell);
    }
  }, [
    board,
    computerMode,
    xPlaying,
    gameOver.isOver,
    gameOver.isTie,
    updateGameScore,
    isWinnerAvailable,
    setWinPattern,
    handleCellClick,
  ]);

  return (
    <div className="computer-match-container">
      <div className="computer-match-board-container">
        <button type="button" onClick={switchMode}>
          change mode
        </button>
        <div>
          computer mode
          {computerMode.active ? ' active' : ' not active'}
        </div>
        <BoardScore {...scores} />
        <Board
          board={board}
          onClick={handleCellClick}
          gameOver={gameOver}
          isCellsActive={!computerMode.turn}
        />
        <ResetButton onClick={resetBoard} />
      </div>
    </div>
  );
}

export default ComputerMatch;
