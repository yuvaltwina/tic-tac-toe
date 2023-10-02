import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthModal from '../../../components/authModals/AuthModal';
import { useUserSelector } from '../../../redux/selectors';
import { logout } from '../../../redux/user';
import './LoginButton.scss';

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useDispatch();
  const { username, isLoggedIn } = useUserSelector();

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
