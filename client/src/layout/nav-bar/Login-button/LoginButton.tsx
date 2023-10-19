import { useState } from 'react';
import AuthModal from '../../../components/authModals/AuthModal';
import UserModal from '../../../components/user-modal/UserModal';
import { useUserSelector } from '../../../redux/selectors';
import getUserImageSrc from '../../../utils/getUserImageSrc';
import './LoginButton.scss';

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);

  const {
    userData: { imageId },
    isLoggedIn,
  } = useUserSelector();

  const openAuthModal = () => setIsAuthModal(true);

  const openUserModal = () => setIsUserModal(true);

  return (
    <>
      <AuthModal isModalOpen={isAuthModal} setIsModalOpen={setIsAuthModal} />
      <UserModal isModalOpen={isUserModal} setIsModalOpen={setIsUserModal} />
      {isLoggedIn ? (
        <button
          className="user-image-button"
          type="button"
          onClick={openUserModal}
        >
          <img alt="user-profile" src={getUserImageSrc(imageId)} />
        </button>
      ) : (
        <button
          type="button"
          className="login-button-container"
          onClick={openAuthModal}
        >
          login
        </button>
      )}
    </>
  );
}

export default LoginButton;
