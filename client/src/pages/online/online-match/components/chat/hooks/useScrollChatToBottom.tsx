import { useEffect, useRef } from 'react';
import { Conversation } from '../../../../context/OnlineGameContext';

function useScrollChatToBottom(gameConversation: Conversation[]) {
  const chatContainerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [gameConversation]);

  return { chatContainerRef };
}

export default useScrollChatToBottom;
