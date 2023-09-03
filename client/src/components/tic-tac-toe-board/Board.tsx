/* eslint react/no-array-index-key: 0 */
import React from 'react';
import {
  BoardValues,
  BoardValuesEnum,
  WinningPattern,
} from '../../types/BoardValues';
import CircleSvg from './components/CircleSvg';
import XSvg from './components/XSvg';
import './Board.scss';
import WinningLineSvg from './components/WinningLineSvg';
import TieSvg from './components/TieSvg';

interface BoardProps {
  board: BoardValues[];
  onClick: (index: number) => void;
  gameOver: {
    isOver: boolean;
    winningPattern: WinningPattern;
    isTie: boolean;
  };
  isCellsActive?: boolean;
}

const { XSign, OSign, emptySign } = BoardValuesEnum;

function Board({ board, onClick, gameOver, isCellsActive }: BoardProps) {
  const { isOver, winningPattern, isTie } = gameOver;

  const currentElement = {
    [OSign]: <CircleSvg />,
    [XSign]: <XSvg />,
    [emptySign]: null,
  };

  return (
    <div className={`board ${isOver && 'board-inactive'}`}>
      {isOver && !isTie && <WinningLineSvg winningPattern={winningPattern} />}
      {isOver && isTie && <TieSvg />}
      {board.map((value, index) => {
        const isCellActive = value === emptySign && !isOver && isCellsActive;

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
