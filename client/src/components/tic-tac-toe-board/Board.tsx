/* eslint react/no-array-index-key: 0 */
import React from 'react';
import BoardValues from '../../types/BoardValues';
import CircleSvg from './components/CircleSvg';
import XSvg from './components/XSvg';
import './Board.scss';
import WinningLineSvg from './components/WinningLineSvg';

interface BoardProps {
  board: BoardValues[];
  onClick: (index: number) => void;
  gameOver: { isOver: boolean; winningPattern: number[] };
}

type CurrentElement = {
  [key in BoardValues]: key extends '' ? null : JSX.Element;
};

function Board({ board, onClick, gameOver }: BoardProps) {
  const { isOver, winningPattern } = gameOver;

  const currentElement: CurrentElement = {
    O: <CircleSvg />,
    X: <XSvg />,
    '': null,
  };

  return (
    <div className={`board ${isOver && 'board-inactive'}`}>
      {isOver && <WinningLineSvg winningPattern={winningPattern} />}
      {board.map((value, index) => {
        const isCellActive = value === '' && !isOver;

        return (
          <button
            type="button"
            key={index}
            className={`cell ${isCellActive && 'cell-active'}`}
            onClick={() => isCellActive && onClick(index)}
          >
            {currentElement[value]}
          </button>
        );
      })}
    </div>
  );
}

export default Board;
