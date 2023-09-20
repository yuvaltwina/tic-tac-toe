import { useEffect } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useConversationUpdate() {
  const { socket, setGameConversation } = useOnlineGameContext();

  // socket.emit('send-message',{message, gameId})

  useEffect(() => {
    socket?.on('conversation-updated', ({ playerId, message }) => {
      setGameConversation({ playerId, message });
    });

    return () => {
      socket?.off('conversation-updated');
    };
  }, [socket, setGameConversation]);
}

export default useConversationUpdate;
