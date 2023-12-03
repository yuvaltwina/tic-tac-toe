import { useMutation } from '@tanstack/react-query';
import { changeUserProfileImage } from './axiosPost';

function useImageIdMutation(
  onSuccess: (_props: any, imageId: number) => void,
  onError: (error: unknown) => void
) {
  const imageIdMutation = useMutation(changeUserProfileImage, {
    onError,
    onSuccess,
  });
  return imageIdMutation;
}

export default useImageIdMutation;
