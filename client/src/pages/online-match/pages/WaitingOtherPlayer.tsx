import React, { useState } from 'react';
import SiteTitle from '../../../components/Site-title/SiteTitle';
import useOnlineGameContext from '../context/useOnlineGameContext';

import './WaitingOtherPlayer.scss';

interface WaitingOtherPlayerProps {
  newGameId: string;
  setShowWaiting: React.Dispatch<React.SetStateAction<boolean>>;
}

function WaitingOtherPlayer({
  newGameId,
  setShowWaiting,
}: WaitingOtherPlayerProps) {
  const { socket } = useOnlineGameContext();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newGameId);
    setCopySuccess(true);
  };

  const closeRoom = () => {
    socket?.emit('close-game', { gameId: newGameId });
    setShowWaiting((prev) => !prev);
  };

  return (
    <div className="link-page">
      <SiteTitle />
      <h1> Waiting for other player to join...</h1>
      <div>
        <p>Your game ID is</p>
        <div className="waiting-player-id">
          {newGameId}
          <button type="button" onClick={copyToClipboard}>
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div>
        <p>Close room</p>
        <div className="waiting-player-id">
          <button type="button" onClick={closeRoom}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}

export default WaitingOtherPlayer;
