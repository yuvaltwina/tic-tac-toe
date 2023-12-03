import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import './UserAvatars.scss';
import useImageIdMutation from '../../../utils/apiService/postRequest/useImageIdMutation';

import { updateData } from '../../../redux/user';

const images = [
  { imageSrc: '/avatars/1.png', imageId: 1 },
  { imageSrc: '/avatars/2.png', imageId: 2 },
  { imageSrc: '/avatars/3.png', imageId: 3 },
  { imageSrc: '/avatars/4.png', imageId: 4 },
  { imageSrc: '/avatars/5.png', imageId: 5 },
  { imageSrc: '/avatars/6.png', imageId: 6 },
];

const TOAST_ID = 'change_image';

const ChangeImageMessages = {
  successMessage: 'Profile image changed',
  errorMessage: 'failed save profile image',
  loadingMessage: 'Changing profile image..',
};

interface UserAvatarsProps {
  isAvatarModalOpen: boolean;
  setIsAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentAvatarId: number;
}
function UserAvatars({
  setIsAvatarModalOpen,
  isAvatarModalOpen,
  currentAvatarId,
}: UserAvatarsProps) {
  const { successMessage, errorMessage, loadingMessage } = ChangeImageMessages;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const onSuccess = (_props: any, imageId: number) => {
    toast.success(successMessage, { id: TOAST_ID });
    setIsAvatarModalOpen(false);
    dispatch(updateData({ imageId }));
    queryClient.invalidateQueries({ queryKey: ['userDetails'] });
  };

  const onError = () => {
    toast.error(errorMessage, { id: TOAST_ID });
  };

  const loginMutation = useImageIdMutation(onSuccess, onError);

  const closeModal = () => {
    setIsAvatarModalOpen(false);
  };

  const ChangeUserAvatar = (image: number) => {
    toast.loading(loadingMessage, { id: TOAST_ID });
    loginMutation.mutate(image);
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
          {images.map(({ imageSrc, imageId }) => {
            const disableAvatar = currentAvatarId === imageId;

            return (
              <button
                type="button"
                key={imageId}
                disabled={disableAvatar}
                onClick={() => {
                  ChangeUserAvatar(imageId);
                }}
                className={`grid-item ${disableAvatar && 'disabled-avatar'}`}
              >
                <div className="image-container">
                  <img src={imageSrc} alt="avatar" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default UserAvatars;
