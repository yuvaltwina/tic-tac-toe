import React from 'react';
import TurnTimer from './TurnTimer';

interface PlayerGameProfileProps {
  isPlaying: boolean;
  playerScore: number;
  playerName: string;
  playerImage: string;
  timerFunction: () => void;
  gameLive: boolean;
}

function PlayerGameProfile({
  isPlaying,
  playerScore,
  playerName,
  playerImage,
  timerFunction,
  gameLive,
}: PlayerGameProfileProps) {
  return (
    <div
      className={`online-match-player ${
        isPlaying && 'online-match-highlight-player'
      }`}
    >
      {gameLive && (
        <TurnTimer
          shouldRun={isPlaying}
          timerDuration={5}
          onTimerEnd={timerFunction}
        />
      )}
      <span className="user-profile" />
      <p className="user-score">
        Total score
        <span> {playerScore}</span>
      </p>
      <p className="user-name">{playerName}</p>
    </div>
  );
}

export default PlayerGameProfile;
