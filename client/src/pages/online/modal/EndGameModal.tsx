import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './EndGameModal.scss';
import { routesData } from '../../../utils/data';
import useGameOver from '../hooks/useGameOver';
import useOnlineGameContext from '../context/useOnlineGameContext';

const { mainPage } = routesData;

function EndGameModal() {
  const {
    socket,
    currentGameInfo: { gameId },
  } = useOnlineGameContext();
  const [rematchButton, setRematchButton] = useState({
    text: 'rematch',
    disable: false,
  });

  const { isModalOpen, modalMessage } = useGameOver(setRematchButton);

  const navigate = useNavigate();

  const returnToMainMenu = () => {
    navigate(mainPage);
  };

  const gameRematch = () => {
    socket?.emit('game-rematch', { gameId });
    setRematchButton({ text: 'waiting for opponent', disable: true });
  };

  return (
    <Modal open={isModalOpen} className="end-game-modal-container">
      <div className="end-game-container">
        <h1>{modalMessage}</h1>
        <div className="end-game-modal-button-container">
          <button
            disabled={rematchButton.disable}
            type="button"
            onClick={gameRematch}
            className="rematch"
          >
            {rematchButton.text}
          </button>
          <button
            type="button"
            onClick={returnToMainMenu}
            className="main-menu"
          >
            main menu
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EndGameModal;
