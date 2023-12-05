import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { routesData } from '../../utils/data';
import { logout } from '../../redux/user';
import './UserModal.scss';
import getUserImageSrc from '../../utils/getUserImageSrc';
import UserAvatars from './components/UserAvatars';
import { useGetCurrentUserInfo } from '../../utils/apiService/getRequest/hooks';

interface UserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const { mainPage, matchHistory } = routesData;
function UserModal({ isModalOpen, setIsModalOpen }: UserModalProps) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCurrentUserInfo(isModalOpen);
  const { imageId, username, points } = data || {
    imageId: 1,
    username: '',
    points: 0,
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const goToMatchHistoryPage = () => {
    navigate(matchHistory);
    closeModal();
  };
  const logOutUser = () => {
    dispatch(logout());
    navigate(mainPage);
    closeModal();
  };

  return (
    <>
      <UserAvatars
        isAvatarModalOpen={isAvatarModalOpen}
        setIsAvatarModalOpen={setIsAvatarModalOpen}
        currentAvatarId={imageId}
      />

      <Modal className="user-modal" open={isModalOpen} onClose={closeModal}>
        <>
          {isLoading && <h1>loading...</h1>}
          {data && (
            <div className="user-modal-info">
              <div className="user-modal-profile">
                <img
                  aria-hidden="true"
                  onClick={() => setIsAvatarModalOpen(true)}
                  alt="user-profile"
                  src={getUserImageSrc(imageId)}
                />
                <h1>{username}</h1>
                <span>current score:{points}</span>
              </div>
              <div className="user-profile-buttons">
                <button type="button" onClick={logOutUser}>
                  logout
                </button>
                <button type="button" onClick={goToMatchHistoryPage}>
                  match history
                </button>
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  );
}

export default UserModal;
