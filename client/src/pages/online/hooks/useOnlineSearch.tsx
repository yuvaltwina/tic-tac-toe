import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useOnlineSearch() {
  const { socket, setCurrentGameInfo } = useOnlineGameContext();

  const [showGame, setShowGame] = useState(false);
  const [showWaitingPlayerToJoin, setShowWaitingPlayerToJoin] = useState(false);

  useEffect(() => {
    socket?.on('user-joined', (game) => {
      setCurrentGameInfo(game);
      setShowGame(true);
      setShowWaitingPlayerToJoin(false);
    });

    return () => {
      socket?.off('user-joined');
    };
  }, [socket, setCurrentGameInfo]);

  return {
    showGame,
    showWaitingPlayerToJoin,
    setShowWaitingPlayerToJoin,
  };
}

export default useOnlineSearch;
