import React from 'react';
import Board from '../../components/tic-tac-toe-board/Board';
import './ComputerMath.scss';

function ComputerMatch() {
  return (
    <div className="computer-match-container">
      <div>my turn</div>
      <Board />
      <div>you turn</div>
    </div>
  );
}

export default ComputerMatch;
