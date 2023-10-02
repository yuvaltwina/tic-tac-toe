import { useSelector } from 'react-redux';
import { UserState } from '../types/types';

export function useUserSelector() {
  const data = useSelector((state: UserState) => state.user);
  return data;
}

export function useDiffSelector() {
  //   const data = useSelector((state: UserState) => state.user);
  //   return { data };
}
