import React, { useState, useRef } from 'react';
import './AuthModal.scss';
import Modal from '@mui/material/Modal';
import RegisterModal from './registerModal/RegisterModal';
import LoginModal from './loginModal/LoginModal';
import SubmitButton from './components/submitButton/SubmitButton';

export const MODAL_NEVIGATION_OPTIONS = {
  REGISTER: 'register',
  LOGIN: 'login',
};

const { LOGIN, REGISTER } = MODAL_NEVIGATION_OPTIONS;

type AuthModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AuthModal({ isModalOpen, setIsModalOpen }: AuthModalProps) {
  const [modalPage, setModalPage] = useState(LOGIN);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const childFormRef: any = useRef(null);

  const handleChildFormSubmit = () => {
    if (childFormRef.current) {
      childFormRef.current.submitForm();
    }
  };

  const navigate = {
    toRegisterPage: () => setModalPage(REGISTER),
    toLoginPage: () => setModalPage(LOGIN),
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate.toLoginPage();
  };

  const displayModalPage = {
    [LOGIN]: {
      pageToRender: (
        <LoginModal
          ref={childFormRef}
          closeModal={closeModal}
          setIsSubmitting={setIsSubmitting}
        />
      ),
      title: 'LOGIN',
      footer: {
        paragraph: 'Dont have an account?',
        link: {
          text: 'Sign up',
          navigateFunction: () => setModalPage(REGISTER),
        },
      },
    },
    [REGISTER]: {
      pageToRender: (
        <RegisterModal
          ref={childFormRef}
          closeModal={closeModal}
          setIsSubmitting={setIsSubmitting}
        />
      ),
      title: 'REGISTER',
      footer: {
        paragraph: 'Dont have an account?',
        link: { text: 'Sign in', navigateFunction: () => setModalPage(LOGIN) },
      },
    },
  };

  const {
    pageToRender,
    title,
    footer: {
      link: { text: NavigateText, navigateFunction },
      paragraph,
    },
  } = displayModalPage[modalPage];

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      className="auth-modal-container"
    >
      <div className="auth-modal">
        <h1 className="modal-title">{title}</h1>
        {pageToRender}
        <SubmitButton
          isSubmitting={isSubmitting}
          onClick={handleChildFormSubmit}
        />

        <footer>
          <p>{paragraph}</p>
          <button
            onClick={navigateFunction}
            type="button"
            className="register-to-login-button"
          >
            {NavigateText}
          </button>
        </footer>
      </div>
    </Modal>
  );
}

export default AuthModal;
