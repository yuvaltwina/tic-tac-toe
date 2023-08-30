/* eslint consistent-return: 0 */
import React, { useState, useCallback, useRef } from 'react';
import Board from '../../components/tic-tac-toe-board/Board';
import BoardValues from '../../types/BoardValues';
import { WIN_CONDITIONS } from '../../utils/data';
import './ComputerMath.scss';

const defaultSquares = Array(9).fill('');
function ComputerMatch() {
  const actionCounter = useRef(0);

  const [board, setBoard] = useState<BoardValues[]>(defaultSquares);
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState({
    isOver: false,
    winningPattern: [0, 0, 0],
    isTie: false,
  });
  const [scores, setScores] = useState({ xScore: 0, oScore: 0, tie: 0 });

  const checkWinner = useCallback((board: BoardValues[]) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver((prev) => ({
          ...prev,
          isOver: true,
          winningPattern: WIN_CONDITIONS[i],
        }));
        return board[x];
      }
    }
  }, []);

  const handleBoxClick = useCallback(
    (boxId: number) => {
      actionCounter.current += 1;
      const isWinnerAvailable = actionCounter.current > 4;
      const isTieAvailable = actionCounter.current > 8;

      const updateBoard = board.map((value, idx) => {
        if (idx === boxId) {
          return xPlaying === true ? 'X' : 'O';
        }
        return value;
      });
      setBoard(updateBoard);
      setXPlaying((prev) => !prev);

      //  Check if either player has won the game

      if (!isWinnerAvailable) return;
      const winner = checkWinner(updateBoard);

      if (winner) {
        if (winner === 'O') {
          setScores((prev) => ({ ...prev, oScore: prev.oScore + 1 }));
        }
        if (winner === 'X') {
          setScores((prev) => ({ ...prev, xScore: prev.xScore + 1 }));
        }
      } else if (isTieAvailable) {
        setGameOver((prev) => ({
          ...prev,
          isOver: true,
          isTie: true,
        }));
        setScores((prev) => ({ ...prev, tie: prev.tie + 1 }));
      }
    },
    [xPlaying, board, checkWinner]
  );

  return (
    <div className="computer-match-container">
      <div className="computer-match-turn">Its your opponent turn</div>
      <Board board={board} onClick={handleBoxClick} gameOver={gameOver} />
      <div
        className={`computer-match-turn ${
          true && 'computer-match-turn-active'
        }`}
      >
        Its your turn
      </div>
    </div>
  );
}

export default ComputerMatch;
