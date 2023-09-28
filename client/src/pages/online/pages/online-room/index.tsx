import React from 'react';
import OnlineSearchLoader from '../../../../Ui/OnlineSearchLoader';
import useSocket from '../../hooks/useSocket';
import useUserJoined from '../../hooks/useUserJoined';
import OnlineMatchPage from '../../online-match/OnlineMatchPage';
import useOpenOnlineRoom from './hooks/useOpenOnlineRoom';
import './index.scss';

function OnlineRoom() {
  useSocket();

  useOpenOnlineRoom();

  const { showGame } = useUserJoined();

  return !showGame ? <OnlineSearchLoader /> : <OnlineMatchPage />;
}

export default OnlineRoom;
