import { useEffect } from 'react';
import useOnlineGameContext from '../context/useOnlineGameContext';

function useConversationUpdate() {
  const { socket, setGameConversation, addNewMessage } = useOnlineGameContext();

  useEffect(() => {
    socket?.on('received-message', ({ playerId, message }) => {
      setGameConversation({ playerId, message });
      addNewMessage();
    });

    return () => {
      socket?.off('received-message');
    };
  }, [socket, setGameConversation, addNewMessage]);
}

export default useConversationUpdate;
