import React from 'react';
import './XSvg.scss';

function XSvg() {
  return (
    <svg className="x-svg" viewBox="0 0 100 100">
      <line className="x-line x-line-1" x1="20" y1="20" x2="80" y2="80" />
      <line className="x-line x-line-2" x1="20" y1="80" x2="80" y2="20" />
    </svg>
  );
}

export default XSvg;
