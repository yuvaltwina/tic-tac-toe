import { useMutation } from '@tanstack/react-query';
import { changeUserProfileImage } from './axiosPost';

function useChangeImageMutation(
  onSuccess: (imageId: Number) => void,
  onError: (error: unknown) => void
) {
  const imageMutation = useMutation(changeUserProfileImage, {
    onError,
    onSuccess,
  });
  return imageMutation;
}

export default useChangeImageMutation;
