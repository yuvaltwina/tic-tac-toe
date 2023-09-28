import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import useConversationUpdate from '../../../hooks/useConversationUpdate';
import './Chat.scss';
import useScrollChatToBottom from './hooks/useScrollChatToBottom';

interface ChatProps {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

function Chat({ openChat, setOpenChat }: ChatProps) {
  const {
    socket,
    gameConversation: { conversation },
    currentGameInfo: { gameId },
  } = useOnlineGameContext();
  const { chatContainerRef } = useScrollChatToBottom(conversation);
  useConversationUpdate();

  const submitHandler = (values: { message: string }) => {
    socket?.emit('send-message', { message: values.message, gameId });
  };

  const { handleChange, handleBlur, values, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: { message: '' },
      validationSchema: yup.object().shape({
        message: yup.string().required().max(100),
      }),
      onSubmit: async (values, { resetForm }) => {
        await submitHandler(values);
        resetForm();
      },
    });

  return (
    <div className={`${openChat && 'show-chat-container'}`}>
      <div className="chat-container">
        <header>
          <h2>Chat</h2>
          <IoMdClose
            className="chat-close-btn"
            onClick={() => {
              setOpenChat((prev) => !prev);
            }}
          />
        </header>
        <ul className="chatbox" ref={chatContainerRef}>
          {conversation.map(({ message, playerId }, index) => {
            const isCurrentUser = playerId === socket?.id;

            return isCurrentUser ? (
              <li className="chat outgoing" key={index}>
                <span>{playerId}</span>
                <p>{message}</p>
              </li>
            ) : (
              <li className="chat incoming" key={index}>
                <span className="chat-user-profile">s</span>
                <p>{message}</p>
              </li>
            );
          })}
        </ul>
        <form className="chat-input" onSubmit={handleSubmit}>
          <textarea
            maxLength={100}
            id="message"
            value={values.message}
            placeholder="Enter a message..."
            spellCheck="false"
            required
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button type="submit" disabled={isSubmitting}>
            <IoMdSend className="chat-input-send" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
