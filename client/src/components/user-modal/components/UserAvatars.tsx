import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import './UserAvatars.scss';

const images = [
  '/avatars/1.png',
  '/avatars/2.png',
  '/avatars/3.png',
  '/avatars/4.png',
  '/avatars/5.png',
  '/avatars/6.png',
];
interface UserAvatarsProps {
  isAvatarModalOpen: boolean;
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function UserAvatars({
  setIsAvatarModalOpen,
  isAvatarModalOpen,
}: UserAvatarsProps) {
  const closeModal = () => {
    setIsAvatarModalOpen(false);
  };

  const ChangeUserAvatar = (image: string) => {
    setIsAvatarModalOpen(false);
  };

  return (
    <Modal
      className="avatars-modal"
      open={isAvatarModalOpen}
      onClose={closeModal}
    >
      <div className="avatars-container">
        <div
          className="close-button"
          aria-hidden="true"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <IoMdClose className="close-icon" />
        </div>
        <div className="grid-container">
          {images.map((image, index) => (
            <div
              aria-hidden="true"
              key={index}
              onClick={() => {
                ChangeUserAvatar(images[index]);
              }}
              className="grid-item"
            >
              <div className="image-container">
                <img src={image} alt="avatar" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default UserAvatars;
