import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopPointsUsers } from './axiosGet';

function useGetTopPointsUsers() {
  return useQuery(['topPointsUsers'], getTopPointsUsers);
}

export default useGetTopPointsUsers;
