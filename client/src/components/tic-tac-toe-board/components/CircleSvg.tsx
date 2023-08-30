import React from 'react';
import './CircleSvg.scss';

function CircleSvg() {
  return (
    <svg className="circle" viewBox="0 0 100 100">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffc700" />
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <circle cx="50" cy="50" r="40" />
      </g>
    </svg>
  );
}

export default CircleSvg;
