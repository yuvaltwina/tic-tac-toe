import axiosInstance from '../axiosInstance';

export const getTopPointsUsers = async () => {
  const serverResponse = await axiosInstance.get('/user/getTopPointsUsers');
  return serverResponse;
};

export const getMatchHistory = async () => {
  const serverResponse = await axiosInstance.get('/match/getMatchHistory');
  return serverResponse;
};
