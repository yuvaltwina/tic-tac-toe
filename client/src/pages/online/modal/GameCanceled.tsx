import React from 'react';
import { useNavigate } from 'react-router';
import { Modal } from '@mui/material';
import { routesData } from '../../../utils/data';
import useGameCanceled from '../hooks/useGameCanceled';
import './GameCanceled.scss';

const { mainPage } = routesData;

function GameCanceled() {
  const { isModalOpen, opponentLeft } = useGameCanceled();
  const navigate = useNavigate();

  const returnToMainMenu = () => {
    navigate(mainPage);
  };

  return (
    <Modal open={isModalOpen} className="game-canceled-modal-container">
      <div className="game-canceled-container">
        <h1>{opponentLeft} left the game</h1>
        <div className="game-canceled-modal-button-container">
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

export default GameCanceled;
