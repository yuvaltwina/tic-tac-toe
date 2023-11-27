import { useQuery } from '@tanstack/react-query';
import { getMatchHistory, getTopPointsUsers } from './axiosGet';

export function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}
