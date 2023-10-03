import { useMutation } from '@tanstack/react-query';
import { checkLoginDetails } from './axiosPost';

function useLoginMutation(
  onSuccess: (resetForm: () => void, loginToken: string) => void,
  onError: (error: unknown) => void
) {
  const loginMutation = useMutation(checkLoginDetails, {
    onError,
    onSuccess: (data, variables) => {
      const { resetForm } = variables;
      const { loginToken } = data;
      onSuccess(resetForm, loginToken);
    },
  });
  return loginMutation;
}

export default useLoginMutation;
