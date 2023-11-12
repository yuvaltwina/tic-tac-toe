import axiosInstance from '../axiosInstance';
import { AxiosType } from '../types/axiosType';
import {
  TGetMatchHistory,
  TGetTopPointsUsers,
  TGetUserInfo,
} from '../types/getReq';

export const getMatchHistory = async () => {
  const serverResponse: AxiosType<TGetMatchHistory, any> =
    await axiosInstance.get('/match/getMatchHistory');
  return serverResponse;
};
export const getTopPointsUsers = async () => {
  const serverResponse: AxiosType<TGetTopPointsUsers, any> =
    await axiosInstance.get('/user/getTopPointsUsers');

  return serverResponse;
};
export const getUserDetails = async () => {
  const serverResponse: AxiosType<TGetUserInfo, any> = await axiosInstance.get(
    '/user/getUserDetails'
  );

  return serverResponse;
};
