/* eslint react/no-array-index-key: 0 */
import React, { useState } from 'react';
import './Board.scss';
import CircleSvg from './CircleSvg';
import XSvg from './XSvg';

const defaultSquares = Array(9).fill('');

function Board() {
  const [board, setBoard] = useState(defaultSquares);

  return (
    <div className="board">
      {board.map((element, index) => (
        <button type="button" key={index} className="cell">
          {index % 2 ? <CircleSvg /> : <XSvg />}
        </button>
      ))}
    </div>
  );
}

export default Board;
