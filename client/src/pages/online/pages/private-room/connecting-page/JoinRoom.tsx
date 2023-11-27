import React from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import './JoinRoom.scss';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import SiteTitle from '../../../../../components/Site-title/SiteTitle';
import MainButton from '../../../../../components/main-button/MainButton';

const initialValues = { gameId: '' };

function JoinRoom({ setShowCreateRoom }: any) {
  const { socket } = useOnlineGameContext();

  const submitHandler = (values: typeof initialValues) => {
    const { gameId } = values;
    socket?.emit('join-game', { gameId });
  };

  const {
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      submitHandler(values);
    },
  });

  const createGame = () => {
    socket?.emit('create-game');
    setShowCreateRoom(true);
  };

  return (
    <div className="connect-match">
      <SiteTitle />
      <div className="join-room-header">
        <h1>Play XO online with your friends</h1>
        <img src="private-room/play-xo.svg" alt="play-xo" />
      </div>
      <form onSubmit={handleSubmit} id="join-game" className="join-game-form">
        <TextField
          className="join-game-textfield"
          type="text"
          name="gameId"
          placeholder="Game Id"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.gameId}
          required
          error={touched.gameId && Boolean(errors.gameId)}
          helperText={touched.gameId && errors.gameId}
        />
      </form>

      <div className="join-room-buttons-container">
        <MainButton form="join-game" disabled={isSubmitting} type="submit">
          Join
        </MainButton>
        <span>OR</span>
        <MainButton disabled={isSubmitting} type="button" onClick={createGame}>
          Create New Game
        </MainButton>
      </div>
    </div>
  );
}

export default JoinRoom;
