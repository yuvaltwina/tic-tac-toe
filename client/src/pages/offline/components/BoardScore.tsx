import React from 'react';
import './BoardScore.scss';

interface BoardScoreProps {
  xScore: number;
  tie: number;
  oScore: number;
  isComputerMode: boolean;
}

function BoardScore({ xScore, tie, oScore, isComputerMode }: BoardScoreProps) {
  const Player1 = isComputerMode ? 'Player' : 'Player 1';
  const Player2 = isComputerMode ? 'Computer' : 'Player 2';

  return (
    <div className="computer-match-score">
      <div className="computer-match-score-container user-score">
        <h1>{Player1} (X)</h1>
        <span>{xScore}</span>
      </div>
      <div className="computer-match-score-container">
        <h1>tie</h1>
        <span>{tie}</span>
      </div>
      <div className="computer-match-score-container user-score">
        <h1>{Player2} (O)</h1>
        <span>{oScore}</span>
      </div>
    </div>
  );
}

export default BoardScore;
