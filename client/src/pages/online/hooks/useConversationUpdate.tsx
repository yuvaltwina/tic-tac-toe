import { useEffect } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useConversationUpdate() {
  const { socket, setGameConversation } = useOnlineGameContext();

  // socket.emit('send-message',{message, gameId})

  useEffect(() => {
    socket?.on('conversation-updated', ({ userId, message }) => {
      setGameConversation({ userId, message });
    });

    return () => {
      socket?.off('conversation-updated');
    };
  }, [socket, setGameConversation]);
}

export default useConversationUpdate;
