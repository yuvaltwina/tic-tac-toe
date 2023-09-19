import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useGameOver(setRematchButton: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { socket } = useOnlineGameContext();

  useEffect(() => {
    socket?.on('listen-game-over', ({ winner, isTie }) => {
      if (winner) {
        if (winner.id === socket?.id) {
          setModalMessage('win');
        } else {
          setModalMessage('lose');
        }
      } else if (isTie) {
        setModalMessage('tie');
      }
      setIsModalOpen(true);
    });

    return () => {
      socket?.off('listen-game-over');
    };
  }, [socket, setIsModalOpen]);

  useEffect(() => {
    socket?.on('listen-game-rematch', () => {
      console.log('rematch');

      setIsModalOpen(false);
      setRematchButton({
        text: 'rematch',
        disable: false,
      });
    });

    return () => {
      socket?.off('listen-game-rematch');
    };
  }, [socket, setRematchButton]);

  return { isModalOpen, modalMessage };
}

export default useGameOver;
