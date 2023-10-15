import axiosInstance from '../axiosInstance';
import { AxiosType } from '../types/axiosType';
import { TGetMatchHistory, TGetTopPointsUsers } from '../types/getReq';

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
