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

interface BoardProps {
  board: BoardValues[];
  onClick: (index: number) => void;
  gameOver: {
    isOver: boolean;
    winningPattern: WinningPattern;
    isTie: boolean;
  };
  inactiveMessage: JSX.Element;
  isCellsActive?: boolean;
}

const { XSign, OSign, emptySign } = BoardValuesEnum;

function Board({
  board,
  onClick,
  gameOver,
  isCellsActive,
  inactiveMessage,
}: BoardProps) {
  const { isOver, winningPattern, isTie } = gameOver;

  const applyMessageDelay = winningPattern.some(
    (value, index) => value !== 0 || value !== [0, 0, 0][index]
  );

  const currentElement = {
    [OSign]: <CircleSvg />,
    [XSign]: <XSvg />,
    [emptySign]: null,
  };

  return (
    <div className={`board ${isOver && 'board-inactive'}`}>
      {isOver && !isTie && <WinningLineSvg winningPattern={winningPattern} />}
      {isOver && inactiveMessage && (
        <div
          className={`${
            !applyMessageDelay
              ? 'board-inactive-message-no-delay'
              : 'board-inactive-message'
          }`}
        >
          {inactiveMessage}
        </div>
      )}
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
