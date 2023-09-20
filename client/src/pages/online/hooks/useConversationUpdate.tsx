import { useEffect } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useConversationUpdate() {
  const { socket, setGameConversation } = useOnlineGameContext();

  // socket.emit('send-message',{message, gameId})

  useEffect(() => {
    socket?.on('received-message', ({ playerId, message }) => {
      setGameConversation({ playerId, message });
    });

    return () => {
      socket?.off('received-message');
    };
  }, [socket, setGameConversation]);
}

export default useConversationUpdate;
