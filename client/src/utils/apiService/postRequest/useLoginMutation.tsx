import { useMutation } from '@tanstack/react-query';
import { checkLoginDetails } from './axiosPost';

function useLoginMutation(
  onSuccess: (
    resetForm: () => void,
    formattedUsername: string,
    loginToken: string
  ) => void,
  onError: (error: unknown) => void
) {
  const loginMutation = useMutation(checkLoginDetails, {
    onError,
    onSuccess: (data, variables) => {
      const { resetForm } = variables;
      const { formattedUsername, loginToken } = data;
      onSuccess(resetForm, formattedUsername, loginToken);
    },
  });
  return loginMutation;
}

export default useLoginMutation;
