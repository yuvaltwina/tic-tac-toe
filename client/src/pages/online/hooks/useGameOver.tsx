import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useGameOver(setRematchButton: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isWon, setIsWon] = useState(false);
  const { socket } = useOnlineGameContext();

  useEffect(() => {
    socket?.on('listen-game-over', ({ winner, isTie }) => {
      if (winner) {
        if (winner.socketId === socket?.id) {
          setModalMessage('You Won!');
          setIsWon(true);
        } else {
          setModalMessage('You Lost!');
        }
      } else if (isTie) {
        setModalMessage('Its A Tie!');
      }
      setIsModalOpen(true);
    });

    return () => {
      socket?.off('listen-game-over');
    };
  }, [socket, setIsModalOpen]);

  useEffect(() => {
    socket?.on('listen-game-rematch', () => {
      setIsWon(false);
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

  return { isModalOpen, modalMessage, isWon };
}

export default useGameOver;
