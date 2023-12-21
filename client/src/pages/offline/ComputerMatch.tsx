/* eslint consistent-return: 0 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Board from '../../components/tic-tac-toe-board/Board';
import OwonSvg from '../../components/tic-tac-toe-board/components/winner-message/OwonSvg';
import TieSvg from '../../components/tic-tac-toe-board/components/winner-message/TieSvg';
import XwonSvg from '../../components/tic-tac-toe-board/components/winner-message/XwonSvg';
import checkWinner from '../../components/tic-tac-toe-board/functions/checkWinner';
import {
  BoardValues,
  BoardValuesEnum,
  WinningPattern,
} from '../../types/BoardValues';
import { GameOver } from '../../types/types';
import BoardScore from './components/BoardScore';
import OfflineModeButtons from './components/OfflineModeButtons';
import './ComputerMatch.scss';
import findBestMove from '../../components/tic-tac-toe-board/functions/findBestMove';
import randomMove from '../../components/tic-tac-toe-board/functions/randomMove';

const { XSign, OSign, emptySign } = BoardValuesEnum;

const startingScores = { xScore: 0, oScore: 0, tie: 0 };

const defaultSquares = new Array(9).fill(emptySign);

function ComputerMatch() {
  const actionCounter = useRef(0);
  const isWinnerAvailable = actionCounter.current >= 4;
  const isTieAvailable = actionCounter.current >= 8;
  const [currentWinner, setCurrentWinner] = useState('');
  const [xPlaying, setXPlaying] = useState(true);

  const [board, setBoard] = useState<BoardValues[]>(defaultSquares);
  const [gameOver, setGameOver] = useState<GameOver>({
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
    (pattern: WinningPattern | undefined) => {
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
        if (winner === OSign) {
          setScores((prev) => ({ ...prev, oScore: prev.oScore + 1 }));
        }
        if (winner === XSign) {
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
          return xPlaying === true ? XSign : OSign;
        }
        return value;
      });
      setBoard(updateBoard);

      // change player
      setXPlaying((prev) => !prev);

      // check for winner
      if (isWinnerAvailable) {
        const { winner, winPattern } = checkWinner(updateBoard);
        setCurrentWinner(winner || '');
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
    setCurrentWinner('');
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
    setXPlaying(true);
  };

  useEffect(() => {
    const isComputerTurnValid =
      computerMode.active &&
      computerMode.turn &&
      !gameOver.isOver &&
      !gameOver.isTie;

    if (isComputerTurnValid) {
      let computerMove;
      const randomNumber = Math.floor(Math.random() * 10);
      const isPlayBestMove = randomNumber > 1;
      if (isPlayBestMove) {
        computerMove = findBestMove(board);
      } else {
        computerMove = randomMove(board);
      }
      handleCellClick(computerMove);
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

  const boardInactiveMessage = () => {
    if (gameOver.isTie) {
      return <TieSvg />;
    }
    const OWon = currentWinner === OSign;
    return OWon ? <OwonSvg /> : <XwonSvg />;
  };

  return (
    <div className="computer-match-container">
      <div className="computer-match-board-container">
        <BoardScore {...scores} isComputerMode={computerMode.active} />
        <div className="board-container">
          {' '}
          <Board
            board={board}
            onClick={handleCellClick}
            gameOver={gameOver}
            isCellsActive={!computerMode.turn}
            inactiveMessage={boardInactiveMessage()}
          />
        </div>
        <div>
          <OfflineModeButtons
            resetFunction={resetBoard}
            isComputerModeActive={computerMode.active}
            switchModeFunction={switchMode}
          />
        </div>
      </div>
    </div>
  );
}

export default ComputerMatch;
