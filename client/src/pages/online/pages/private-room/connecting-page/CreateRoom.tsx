import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import SiteTitle from '../../../../../components/Site-title/SiteTitle';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import useRoomCreated from './hooks/useRoomCreated';
import './CreateRoom.scss';
import MainButton from '../../../../../components/Main-button/MainButton';

function CreateRoom({ setShowCreateRoom }: any) {
  const { socket } = useOnlineGameContext();
  const { newGameId } = useRoomCreated();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newGameId);
    setCopied(true);
  };

  const onToolTipMouseOut = () => {
    setTimeout(() => {
      setCopied(false);
    }, 100);
  };

  const closeRoom = () => {
    socket?.emit('close-game', { gameId: newGameId });
    setShowCreateRoom(false);
  };

  return (
    <div className="link-page">
      <SiteTitle />
      <h1> Waiting for other player to join...</h1>
      <div className="link-page-game-id-container">
        <p>Your game ID</p>

        <Tooltip
          title={copied ? 'copied!' : 'copy'}
          onClick={copyToClipboard}
          arrow
          onMouseOut={onToolTipMouseOut}
        >
          <div className="link-page-game-id">{newGameId}</div>
        </Tooltip>
      </div>

      <div className="link-page-close-room">
        <MainButton type="button" onClick={closeRoom}>
          Close room
        </MainButton>
      </div>
    </div>
  );
}

export default CreateRoom;
