/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import {
  deleteSessionStorageItem,
  getSessionStorageItem,
  setSessionStorageItem,
} from '../utils/sessionStorageFn';
import { UserSliceState } from './types/slices';
import { useGetCurrentUserInfo } from '../utils/apiService/getRequest/hooks';

type ReduxLoginAction = {
  payload: { loginToken: string };
};
const userDataInitialValues: UserSliceState['userData'] = {
  imageId: 0,
  points: 0,
  userId: 0,
  username: '',
};

const decodeToken = (token: string): UserSliceState['userData'] => {
  const splitToken = token.split('.')[1];
  const decodedToken = window.atob(splitToken);
  const tokenDecoded = JSON.parse(decodedToken);
  return tokenDecoded;
};

const getInitialUserData = (): UserSliceState['userData'] => {
  const loginToken = getSessionStorageItem('login');
  if (loginToken) {
    try {
      const userData = decodeToken(loginToken);
      if (userData) {
        return userData;
      }
    } catch (error) {
      deleteSessionStorageItem('login');
    }
  }
  return userDataInitialValues;
};
const getInitialUserData2 = (): UserSliceState['userData'] => {
  const { data, isError } = useGetCurrentUserInfo();
  if (isError) {
    return userDataInitialValues;
  }
  const userData = data?.data;
  if (!userData) {
    return userDataInitialValues;
  }
  const { imageId, username, points } = userData;
  return { ...userData, userId: 0 };
};

const initialState = {
  userData: getInitialUserData(),
  isLoggedIn: !!getInitialUserData().userId,
};

const loginHandler = (state: UserSliceState, action: ReduxLoginAction) => {
  const { loginToken } = action.payload;
  state.isLoggedIn = true;

  try {
    const userData = decodeToken(loginToken);

    state.userData = userData;
    setSessionStorageItem('login', loginToken);
  } catch (error) {
    console.log(error);
  }
};

const logoutHandler = (state: UserSliceState) => {
  state.isLoggedIn = false;
  state.userData = userDataInitialValues;
  deleteSessionStorageItem('login');
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: loginHandler,
    logout: logoutHandler,
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
