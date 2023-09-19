import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

function ConnectingMatch() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  return showCreateRoom ? (
    <CreateRoom setShowCreateRoom={setShowCreateRoom} />
  ) : (
    <JoinRoom setShowCreateRoom={setShowCreateRoom} />
  );
}

export default ConnectingMatch;
