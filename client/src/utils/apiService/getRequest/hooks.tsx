import { useQuery } from '@tanstack/react-query';
import { getMatchHistory, getTopPointsUsers, getUserDetails } from './axiosGet';

export function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}

export function useGetCurrentUserInfo(isEnabled: boolean) {
  return useQuery(['userDetails'], getUserDetails, { enabled: isEnabled });
}
