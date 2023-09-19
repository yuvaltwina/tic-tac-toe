import React, { useState } from 'react';
import SiteTitle from '../../../../../components/Site-title/SiteTitle';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import useRoomCreated from './hooks/useRoomCreated';
import './CreateRoom.scss';

function CreateRoom({ setShowCreateRoom }: any) {
  const { socket } = useOnlineGameContext();
  const { newGameId } = useRoomCreated();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newGameId);
    setCopySuccess(true);
  };

  const closeRoom = () => {
    socket?.emit('close-game', { gameId: newGameId });
    setShowCreateRoom(false);
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

export default CreateRoom;
