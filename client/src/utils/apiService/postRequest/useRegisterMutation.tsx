import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createUser } from './axiosPost';

const LOADING_TEXT = 'Creating User';

function useRegisterMutation(
  onSuccess: (resetForm: () => void, loadingToastId: string) => void,
  onError: (error: unknown, loadingToastId: string) => void
) {
  const registerMutation = useMutation(createUser, {
    onError: (error, variabels, context) => {
      const loadingToastId = context as string;
      onError(error, loadingToastId);
    },
    onSuccess: (data, variabels, context) => {
      const { resetForm } = variabels;
      const loadingToastId = context;
      onSuccess(resetForm, loadingToastId as string);
    },
    onMutate: () => {
      const loadingToastId = toast.loading(LOADING_TEXT);
      return loadingToastId;
    },
  });
  return registerMutation;
}

export default useRegisterMutation;
