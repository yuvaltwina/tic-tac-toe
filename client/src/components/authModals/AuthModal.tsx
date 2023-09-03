import React, { useState } from 'react';
import './AuthModal.scss';
import Modal from '@mui/material/Modal';
import { MODAL_NEVIGATION_OPTIONS } from '../../utils/data';
import RegisterModal from './registerModal/RegisterModal';
import LoginModal from './loginModal/LoginModal';

const { LOGIN, REGISTER } = MODAL_NEVIGATION_OPTIONS;
type Tprops = {
  isAuthModal: boolean;
  setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthModal({ isAuthModal, setIsAuthModal }: Tprops) {
  const [modalPage, setModalPage] = useState(LOGIN);

  const navigate = {
    toRegisterPage: () => setModalPage(REGISTER),
    toLoginPage: () => setModalPage(LOGIN),
  };

  const closeModal = () => {
    setIsAuthModal(false);
    navigate.toLoginPage();
  };
  const displayPage = () => {
    if (modalPage === REGISTER) {
      return (
        <RegisterModal setModalPage={setModalPage} closeModal={closeModal} />
      );
    }
    return <LoginModal setModalPage={setModalPage} closeModal={closeModal} />;
  };

  return (
    <Modal
      open={isAuthModal}
      onClose={closeModal}
      className="auth-modal-container"
    >
      <div className="auth-modal">{displayPage()}</div>
    </Modal>
  );
}

export default AuthModal;
