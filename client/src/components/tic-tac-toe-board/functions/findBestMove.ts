import { BoardValues, BoardValuesEnum } from '../../../types/BoardValues';
import checkWinner from './checkWinner';

const { XSign, OSign, emptySign } = BoardValuesEnum;

function evaluate(board: BoardValues[]) {
  const { winner, isTie } = checkWinner(board);
  if (isTie) return 0;
  if (winner === XSign) return -1;
  if (winner === OSign) return 1;
  return null;
}

function minimax(
  board: BoardValues[],
  depth: number,
  isMaximizingPlayer: boolean
) {
  const result = evaluate(board);

  if (result !== null) {
    return result;
  }
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === emptySign) {
        board[i] = OSign;
        const score = minimax(board, depth + 1, false);
        board[i] = emptySign;
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  }
  let bestScore = Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === emptySign) {
      board[i] = XSign;
      const score = minimax(board, depth + 1, true);
      board[i] = emptySign;
      bestScore = Math.min(score, bestScore);
    }
  }

  return bestScore;
}

function findBestMove(board: BoardValues[]) {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === emptySign) {
      board[i] = OSign;
      const score = minimax(board, 0, false);
      board[i] = emptySign;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
export default findBestMove;
