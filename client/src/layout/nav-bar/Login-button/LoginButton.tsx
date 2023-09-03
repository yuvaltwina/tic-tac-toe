import React, { useState } from 'react';
import './LoginButton.scss';
import AuthModal from '../../../components/authModals/AuthModal';

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const openAuthModal = () => setIsAuthModal(true);
  return (
    <>
      <AuthModal isAuthModal={isAuthModal} setIsAuthModal={setIsAuthModal} />
      <button
        type="button"
        className="login-button-container"
        onClick={openAuthModal}
      >
        Login
      </button>
    </>
  );
}

export default LoginButton;
