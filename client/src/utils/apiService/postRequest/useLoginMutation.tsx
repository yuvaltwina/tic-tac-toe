import { useMutation } from '@tanstack/react-query';
import { checkLoginDetails } from './axiosPost';
import { UserSliceState } from '../../../redux/types/slices';

function useLoginMutation(
  onSuccess: (resetForm: () => void, loginToken: string, userData:UserSliceState['userData']) => void,
  onError: (error: unknown) => void
) {
  const loginMutation = useMutation(checkLoginDetails, {
    onError,
    onSuccess: (data:any, variables) => {
      const { resetForm } = variables;
      const { loginToken, userData } = data;
      onSuccess(resetForm, loginToken, userData);
    },
  });
  return loginMutation;
}

export default useLoginMutation;
