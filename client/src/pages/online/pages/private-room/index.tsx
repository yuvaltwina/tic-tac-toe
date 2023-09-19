import React from 'react';
import OnlineMatchPage from '../../online-match/OnlineMatchPage';
import useUserJoined from '../../hooks/useUserJoined';
import useSocket from '../../hooks/useSocket';
import ConnectingMatch from './connecting-page';

function PrivateRoom() {
  useSocket();

  const { showGame } = useUserJoined();

  return !showGame ? <ConnectingMatch /> : <OnlineMatchPage />;
}

export default PrivateRoom;
