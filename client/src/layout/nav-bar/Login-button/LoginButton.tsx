import React, { useState } from 'react';
import './LoginButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from '../../../components/authModals/AuthModal';
import { UserState } from '../../../types/types';
import { logout } from '../../../utils/reduxState/user';

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useDispatch();
  const { username, isLoggedIn } = useSelector(
    (state: UserState) => state.user
  );

  const openAuthModal = () => setIsAuthModal(true);

  const logOutUser = () => dispatch(logout());

  return (
    <>
      <AuthModal isModalOpen={isAuthModal} setIsModalOpen={setIsAuthModal} />
      <button
        type="button"
        className="login-button-container"
        onClick={isLoggedIn ? logOutUser : openAuthModal}
      >
        {isLoggedIn ? username : 'login'}
      </button>
    </>
  );
}

export default LoginButton;
