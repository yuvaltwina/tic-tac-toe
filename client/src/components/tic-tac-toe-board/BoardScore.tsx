import React from 'react';
import './BoardScore.scss';

interface BoardScoreProps {
  xScore: number;
  tie: number;
  oScore: number;
}

function BoardScore({ xScore, tie, oScore }: BoardScoreProps) {
  return (
    <div className="computer-match-score">
      <div className="computer-match-score-container">
        <h1>PLAYER (X)</h1>
        <span>{xScore}</span>
      </div>
      <div className="computer-match-score-container">
        <h1>tie</h1>
        <span>{tie}</span>
      </div>
      <div className="computer-match-score-container">
        <h1>PLAYER (O)</h1>
        <span>{oScore}</span>
      </div>
    </div>
  );
}

export default BoardScore;
