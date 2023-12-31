import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoMdClose, IoMdSend } from 'react-icons/io';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import useConversationUpdate from '../../../hooks/useConversationUpdate';
import './Chat.scss';
import useScrollChatToBottom from './hooks/useScrollChatToBottom';
import getUserImageSrc from '../../../../../utils/getUserImageSrc';

interface ChatProps {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

function Chat({ openChat, setOpenChat }: ChatProps) {
  const {
    socket,
    gameConversation: { conversation },
    currentGameInfo: { gameId, playerOne, playerTwo },
  } = useOnlineGameContext();
  const { chatContainerRef } = useScrollChatToBottom(conversation);
  useConversationUpdate();

  const opponentUserImage =
    socket?.id === playerOne.socketId ? playerTwo.imageId : playerOne.imageId;
  const playerProfileImage = getUserImageSrc(opponentUserImage);

  const submitHandler = (values: { message: string }) => {
    socket?.emit('send-message', { message: values.message, gameId });
  };

  const {
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    isSubmitting,
    submitForm,
  } = useFormik({
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
                <img
                  alt="user-profile"
                  src={playerProfileImage}
                  className="chat-user-profile"
                />
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitForm();
              }
            }}
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
