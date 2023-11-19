import { useQuery } from '@tanstack/react-query';
import { getMatchHistory, getTopPointsUsers, getUserDetails } from './axiosGet';

export function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}

export function useGetCurrentUserInfo() {
  return useQuery(['userDetails'], getUserDetails);
}
// const { data } = useGetCurrentUserInfo(isModalOpen);
