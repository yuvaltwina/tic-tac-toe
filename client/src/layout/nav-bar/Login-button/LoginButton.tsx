import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../../components/authModals/AuthModal';
import { useUserSelector } from '../../../redux/selectors';
import { logout } from '../../../redux/user';
import { routesData } from '../../../utils/data';
import getUserImageSrc from '../../../utils/getUserImageSrc';
import './LoginButton.scss';

const { mainPage } = routesData;

function LoginButton() {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userData: { imageId },
    isLoggedIn,
  } = useUserSelector();

  const openAuthModal = () => setIsAuthModal(true);

  const logOutUser = () => {
    dispatch(logout());
    navigate(mainPage);
  };

  return (
    <>
      <AuthModal isModalOpen={isAuthModal} setIsModalOpen={setIsAuthModal} />
      {isLoggedIn ? (
        <button
          className="user-image-button"
          type="button"
          onClick={logOutUser}
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
