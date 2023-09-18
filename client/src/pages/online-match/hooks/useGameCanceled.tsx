import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useGameCanceled() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opponentLeft, setOpponentLeft] = useState('');
  const { socket, resetGameOver } = useOnlineGameContext();

  useEffect(() => {
    socket?.on('listen-game-canceled', ({ opponent }) => {
      resetGameOver();
      setIsModalOpen(true);
      setOpponentLeft(opponent.name);
    });

    return () => {
      socket?.off('listen-game-canceled');
    };
  }, [socket, resetGameOver]);
  return { isModalOpen, opponentLeft };
}

export default useGameCanceled;
