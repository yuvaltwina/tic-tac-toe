/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { UserSliceState } from './types/slices';

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
  const loginToken = Cookies.get('login');
  if (loginToken) {
    try {
      const userData = decodeToken(loginToken);
      if (userData) {
        return userData;
      }
    } catch (error) {
      Cookies.remove('login');
    }
  }
  return userDataInitialValues;
};

const initialState = {
  userData: getInitialUserData(),
  isLoggedIn: !!getInitialUserData(),
};

const loginHandler = (state: UserSliceState, action: ReduxLoginAction) => {
  const { loginToken } = action.payload;
  state.isLoggedIn = true;

  try {
    const userData = decodeToken(loginToken);

    state.userData = userData;
    Cookies.set('login', loginToken, { expires: 7 });
  } catch (error) {
    console.log(error);
  }
};

const logoutHandler = (state: UserSliceState) => {
  state.isLoggedIn = false;
  state.userData = userDataInitialValues;
  Cookies.remove('login');
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
