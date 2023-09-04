import React, { useState } from 'react';
import './AuthModal.scss';
import Modal from '@mui/material/Modal';
import { MODAL_NEVIGATION_OPTIONS } from '../../utils/data';
import RegisterModal from './registerModal/RegisterModal';
import LoginModal from './loginModal/LoginModal';

const { LOGIN, REGISTER } = MODAL_NEVIGATION_OPTIONS;
type Props = {
  isAuthModal: boolean;
  setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthModal({ isAuthModal, setIsAuthModal }: Props) {
  const [modalPage, setModalPage] = useState(LOGIN);

  const closeModal = () => {
    setIsAuthModal(false);
    navigate.toLoginPage();
  };
  const navigate = {
    toRegisterPage: () => setModalPage(REGISTER),
    toLoginPage: () => setModalPage(LOGIN),
  };
  const displayModalPage = {
    [LOGIN]: {
      pageToRender: <LoginModal navigate={navigate} closeModal={closeModal} />,
      title: 'LOGIN',
    },
    [REGISTER]: {
      pageToRender: (
        <RegisterModal navigate={navigate} closeModal={closeModal} />
      ),
      title: 'REGISTER',
    },
  };

  const { pageToRender, title } = displayModalPage[modalPage];
  return (
    <Modal
      open={isAuthModal}
      onClose={closeModal}
      className="auth-modal-container"
    >
      <div className="auth-modal">
        <h1 className="modal-title">{title}</h1>
        {pageToRender}
      </div>
    </Modal>
  );
}

export default AuthModal;
