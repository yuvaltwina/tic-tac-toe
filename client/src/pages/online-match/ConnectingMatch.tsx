import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import './ConnectingMatch.scss';
import WaitingOtherPlayer from './pages/WaitingOtherPlayer';
import generateOnlineGameId from '../../utils/generateOnlineGameId';
import OnlineMatchPage from './pages/OnlineMatchPage';
import useUserJoined from './hooks/useUserJoined';
import useOnlineGameContext from './context/useOnlineGameContext';
import useSocket from './hooks/useSocket';
import SiteTitle from '../../components/Site-title/SiteTitle';

const initialValues = { name: '', gameId: '' };

function ConnectingMatch() {
  const [newGameId, setNewGameId] = useState('');

  useSocket();

  const { socket } = useOnlineGameContext();

  const {
    currentGameInfo,
    showGame,
    showWaitingPlayerToJoin,
    setShowWaitingPlayerToJoin,
  } = useUserJoined();

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
    const myNewGameId = generateOnlineGameId();
    setNewGameId(myNewGameId);

    socket?.emit('create-game', {
      newGameId: myNewGameId,
      name: values.name || 'my name',
    });

    setShowWaitingPlayerToJoin(true);
  };

  return (
    <>
      {!showWaitingPlayerToJoin && !showGame && (
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
      )}
      {showWaitingPlayerToJoin && (
        <WaitingOtherPlayer
          newGameId={newGameId}
          setShowWaiting={setShowWaitingPlayerToJoin}
        />
      )}
      {showGame && currentGameInfo && <OnlineMatchPage />}
    </>
  );
}

export default ConnectingMatch;
