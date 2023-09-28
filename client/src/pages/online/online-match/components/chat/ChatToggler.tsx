import React, { useState } from 'react';
import Chat from './Chat';
import ChatButton from './ChatButton';
import './ChatToggler.scss';

function ChatToggler() {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div>
      <button
        className="chat-toggler"
        type="button"
        onClick={() => {
          setOpenChat((prev) => !prev);
        }}
      >
        <ChatButton openChat={openChat} />
      </button>
      <Chat openChat={openChat} setOpenChat={setOpenChat} />
    </div>
  );
}

export default ChatToggler;
