import React from 'react';
import getUserImageSrc from '../../../../utils/getUserImageSrc';
import TurnTimer from './TurnTimer';
import './PlayerGameProfile.scss';

interface PlayerGameProfileProps {
  isPlaying: boolean;
  playerScore: number;
  playerName: string;
  playerImage: number;
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
  const playerProfileImage = getUserImageSrc(playerImage);

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

      <TurnTimer
        shouldRun={isPlaying}
        timerDuration={5}
        onTimerEnd={timerFunction}
      />
      <img
        alt="user-profile"
        src={playerProfileImage}
        className="user-profile"
      />

      <p className="user-score">
        Total score
        <span> {playerScore}</span>
      </p>
      <p className="user-name">{playerName}</p>
    </div>
  );
}

export default PlayerGameProfile;
