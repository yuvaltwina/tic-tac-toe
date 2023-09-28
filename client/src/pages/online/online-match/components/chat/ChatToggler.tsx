import React, { useState } from 'react';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import Chat from './Chat';
import ChatButton from './ChatButton';
import './ChatToggler.scss';

function ChatToggler() {
  const [openChat, setOpenChat] = useState(false);
  const {
    gameConversation: { newMessages },
    addNewMessage,
  } = useOnlineGameContext();

  const toggleOpenChat = () => {
    setOpenChat((prev) => {
      if (prev) {
        addNewMessage(true);
      }
      return !prev;
    });
  };

  return (
    <div>
      <button className="chat-toggler" type="button" onClick={toggleOpenChat}>
        {newMessages === 0 || openChat || (
          <div className="chat-toggler-new-message">
            {newMessages <= 4 ? newMessages : '4+'}
          </div>
        )}
        <ChatButton openChat={openChat} />
      </button>
      <Chat openChat={openChat} setOpenChat={setOpenChat} />
    </div>
  );
}

export default ChatToggler;
