import axiosInstance from '../axiosInstance';

type UserFormDetails = {
  username: string;
  password: string;
  resetForm: () => void;
};
export const createUser = async ({ username, password }: UserFormDetails) => {
  const serverResponse = await axiosInstance.post('/user/register', {
    username,
    password,
  });
  return serverResponse;
};

export const checkLoginDetails = async ({
  username,
  password,
}: UserFormDetails) => {
  const serverResponse = await axiosInstance.post('/user/login', {
    username,
    password,
  });
  const { formattedUsername, loginToken } = serverResponse.data.payload;
  return { formattedUsername, loginToken };
};
