import { useQuery } from '@tanstack/react-query';
import { getMatchHistory, getTopPointsUsers, getUserInfo } from './axiosGet';

export function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}

export function useGetCurrentUserInfo(isEnabled: boolean) {
  return useQuery(['userInfo'], getUserInfo, { enabled: isEnabled });
}
