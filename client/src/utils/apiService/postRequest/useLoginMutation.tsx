import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { checkLoginDetails } from './axiosPost';
import { UserSliceState } from '../../../redux/types/slices';

const LOADING_TEXT = 'Logging in';

function useLoginMutation(
  onSuccess: (resetForm: () => void, loginToken: string, userData:UserSliceState['userData'], loadingToastId:string) => void,
  onError: (error: unknown, loadingToastId:string) => void
) {
  const loginMutation = useMutation(checkLoginDetails, {
    onError: (error, variabels, context) => {
      const loadingToastId = context as string;
      onError(error, loadingToastId);
    },
    onSuccess: (data:any, variables, context) => {
      const { resetForm } = variables;
      const { loginToken, userData } = data;
      const loadingToastId = context as string;
      setTimeout(()=>{},200000)
      onSuccess(resetForm, loginToken, userData, loadingToastId);
    },
onMutate: () => {
      const loadingToastId = toast.loading(LOADING_TEXT);
      return loadingToastId;
    },
  });
  return loginMutation;
}

export default useLoginMutation;
