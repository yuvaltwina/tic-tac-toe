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

export const changeUserProfileImage = async (imageId:number) => {
  const serverResponse = await axiosInstance.post('/user/changeUserProfileImage', {
    imageId,
  });

  return serverResponse?.data;
};

export const checkLoginDetails = async ({
  username,
  password,
}: UserFormDetails) => {
  const serverResponse = await axiosInstance.post('/user/login', {
    username,
    password,
  });
  const { loginToken } = serverResponse.data.payload;
  return { loginToken };
};
