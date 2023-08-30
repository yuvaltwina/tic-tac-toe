import React from 'react';
import './WinningLineSvg.scss';

const winningsLine = [
  {
    winningRow: [0, 1, 2],
    winningLine: { x1: '8%', y1: '16.5%', x2: '92%', y2: '16.5%' },
  },

  {
    winningRow: [3, 4, 5],
    winningLine: { x1: '8%', y1: '50%', x2: '92%', y2: '50%' },
  },
  {
    winningRow: [6, 7, 8],
    winningLine: { x1: '8%', y1: '83.5%', x2: '92%', y2: '83.5%' },
  },
  {
    winningRow: [0, 3, 6],
    winningLine: { x1: '16.5%', y1: '92%', x2: '16.5%', y2: '8%' },
  },
  {
    winningRow: [1, 4, 7],
    winningLine: { x1: '50%', y1: '92%', x2: '50%', y2: '8%' },
  },
  {
    winningRow: [2, 5, 8],
    winningLine: { x1: '83.5%', y1: '92%', x2: '83.5%', y2: '8%' },
  },
  {
    winningRow: [0, 4, 8],
    winningLine: { x1: '90%', y1: '90%', x2: '10%', y2: '10%' },
  },
  {
    winningRow: [2, 4, 6],
    winningLine: { x1: '10%', y1: '90%', x2: '90%', y2: '10%' },
  },
];

const findWinningLine = (pattern: number[]) => {
  const { winningLine } =
    winningsLine.find(({ winningRow }) => {
      if (JSON.stringify(winningRow) === JSON.stringify(pattern)) {
        return true;
      }
      return false;
    }) ?? {};
  return winningLine;
};

interface WinningLineSvgProps {
  winningPattern: number[];
}

function WinningLineSvg({ winningPattern }: WinningLineSvgProps) {
  return (
    <svg className="winning-line-svg" viewBox="0 0 100 100">
      <line className="winning-line" {...findWinningLine(winningPattern)} />
    </svg>
  );
}

export default WinningLineSvg;
