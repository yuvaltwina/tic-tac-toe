import { useQuery } from '@tanstack/react-query';
import { getMatchHistory, getTopPointsUsers } from './axiosGet';

export function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}

export function useGetCurrentUserInfo(isActive: boolean) {
  return useQuery(['userDetails'], getUserDetails, { enabled: isActive });
}
// const { data } = useGetCurrentUserInfo(isModalOpen);
