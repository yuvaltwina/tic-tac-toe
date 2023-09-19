import { useEffect, useState } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useGameMoveUpdate(playerOneId: string) {
  const [canPlay, setCanPlay] = useState(playerOneId);
  const { socket, setBoard } = useOnlineGameContext();

  useEffect(() => {
    socket?.on('game-updated', ({ board, playerTurn }) => {
      setBoard(board);
      setCanPlay(playerTurn);
    });

    return () => {
      socket?.off('game-updated');
    };
  }, [socket, setBoard]);

  return { canPlay };
}

export default useGameMoveUpdate;
