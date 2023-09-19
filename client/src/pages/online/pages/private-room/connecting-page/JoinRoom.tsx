import React from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import './JoinRoom.scss';
import useOnlineGameContext from '../../../context/useOnlineGameContext';
import SiteTitle from '../../../../../components/Site-title/SiteTitle';

const initialValues = { name: '', gameId: '' };

function JoinRoom({ setShowCreateRoom }: any) {
  const { socket } = useOnlineGameContext();

  const submitHandler = (values: typeof initialValues) => {
    const { gameId, name } = values;
    socket?.emit('join-game', { gameId, name });
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
    socket?.emit('create-game', {
      name: values.name || 'my name',
    });

    setShowCreateRoom(true);
  };

  return (
    <div className="connect-match">
      <SiteTitle />
      <h1>Play XO online with your friends</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          placeholder="insert your name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          required
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          type="text"
          name="gameId"
          placeholder="insert your gameId"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.gameId}
          required
          error={touched.gameId && Boolean(errors.gameId)}
          helperText={touched.gameId && errors.gameId}
        />
        <button type="submit">Join</button>
      </form>
      <span>OR</span>
      <button disabled={isSubmitting} type="button" onClick={createGame}>
        Create New Game
      </button>
    </div>
  );
}

export default JoinRoom;
