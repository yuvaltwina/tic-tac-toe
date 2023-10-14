import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMatchHistory } from './axiosGet';

function useGetMatchHistory() {
  return useQuery(['matchHistory'], getMatchHistory);
}

export default useGetMatchHistory;
