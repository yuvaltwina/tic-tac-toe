import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useUserJoined() {
  const { socket, setCurrentGameInfo } = useOnlineGameContext();

  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    socket?.on('user-joined', (game) => {
      setCurrentGameInfo(game);
      setShowGame(true);
    });

    return () => {
      socket?.off('user-joined');
    };
  }, [socket, setCurrentGameInfo]);

  return {
    showGame,
  };
}

export default useUserJoined;
