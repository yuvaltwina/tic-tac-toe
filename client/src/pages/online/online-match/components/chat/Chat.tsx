import React from 'react';
import './Chat.scss';
import TextField from '@mui/material/TextField';

type ChatProps = {
  isChat: boolean;
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>;
};

function Chat({ isChat, setIsChat }: ChatProps) {
  if (!isChat) {
    return <div />;
  }
  return (
    <div className="chat-container">
      <section className="chat-my-message-container">
        <div className="chat-message-headline">
          <span className="chat-message-icon" />
          <h2>Yuval</h2>
        </div>
        <div className="chat-my-message">f</div>
      </section>
      <section className="chat-my-message-container">
        <div className="chat-message-headline">
          <span className="chat-message-icon" />
          <h2>Yuval</h2>
        </div>
        <div className="chat-my-message">f</div>
      </section>
      <section className="chat-input-container">
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Type you Message!"
          multiline
          rows={2}
          fullWidth
          className="chat-input"
        />
      </section>
    </div>
  );
}

export default Chat;
