import { useEffect, useState } from 'react';
import useOnlineGameContext from '../../../../context/useOnlineGameContext';

function useRoomCreated() {
  const { socket } = useOnlineGameContext();
  const [newGameId, setNewGameId] = useState('');

  useEffect(() => {
    socket?.on('room-created', (gameId) => {
      setNewGameId(gameId);
    });

    return () => {
      socket?.off('room-created');
    };
  }, [socket]);

  return { newGameId };
}

export default useRoomCreated;
