import axiosInstance from './axiosInstance';

export const createUser = async (username: string, password: string) => {
  const serverResponse = await axiosInstance.post('/user/register', {
    username,
    password,
  });
  return serverResponse;
};
export const checkLoginDetails = async (username: string, password: string) => {
  const serverResponse = await axiosInstance.post('/user/login', {
    username,
    password,
  });
  return serverResponse.data.payload;
};
