import React, { useState } from 'react';
import './LoginButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from '../../../components/authModals/AuthModal';
import { UserState } from '../../../types/types';
import { logout } from '../../../utils/reduxState/user';

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const openAuthModal = () => setIsAuthModal(true);
  const dispatch = useDispatch();
  const { username, isLoggedIn } = useSelector(
    (state: UserState) => state.user
  );
  const displayLoginButton = (
    <button
      type="button"
      className="login-button-container"
      onClick={openAuthModal}
    >
      Login
    </button>
  );
  const displayUsernameButton = (
    <button
      type="button"
      className="login-button-container"
      onClick={() => dispatch(logout())}
    >
      {username}
    </button>
  );
  const displayButton = isLoggedIn ? displayUsernameButton : displayLoginButton;
  return (
    <>
      <AuthModal isAuthModal={isAuthModal} setIsAuthModal={setIsAuthModal} />
      {displayButton}
    </>
  );
}

export default LoginButton;
