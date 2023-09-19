import React from 'react';
import useSocket from '../../hooks/useSocket';
import useUserJoined from '../../hooks/useUserJoined';
import OnlineMatchPage from '../../online-match/OnlineMatchPage';
import useOpenOnlineRoom from './hooks/useOpenOnlineRoom';
import './index.scss';

function OnlineRoom() {
  useSocket();

  useOpenOnlineRoom();

  const { showGame } = useUserJoined();

  return !showGame ? <h1>search online for player...</h1> : <OnlineMatchPage />;
}

export default OnlineRoom;
