import { useSelector } from 'react-redux';
import { UserSelectorState } from './types/selectors';

export function useUserSelector() {
  const data = useSelector((state: UserSelectorState) => state.user);
  return data;
}

export function useDiffSelector() {
  //   const data = useSelector((state: UserState) => state.user);
  //   return { data };
}
