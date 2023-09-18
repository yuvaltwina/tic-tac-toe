import { BoardValues } from '../../../types/BoardValues';
import { WIN_CONDITIONS } from '../../../utils/data';

const checkWinner = (board: BoardValues[]) => {
  let isTie = true;
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [x, y, z] = WIN_CONDITIONS[i];

    if (board[x] && board[x] === board[y] && board[y] === board[z]) {
      return { winner: board[x], winPattern: WIN_CONDITIONS[i] };
    }
  }
  if (isTie) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        isTie = false;
        break;
      }
    }
  }
  return { winner: undefined, winPattern: undefined, isTie };
};

export default checkWinner;
