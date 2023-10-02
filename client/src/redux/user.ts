/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type ReduxUserState = { username: string; isLoggedIn: boolean };

type ReduxLoginAction = {
  payload: { formattedUsername: string; loginToken: string };
};

const getInitialUsername = () => {
  const loginCookie = Cookies.get('login');
  if (loginCookie) {
    const token = loginCookie.split('.')[1];
    try {
      const decodedToken = window.atob(token);
      const { username } = JSON.parse(decodedToken);
      if (username) {
        return username;
      }
    } catch (error) {
      Cookies.remove('login');
    }
  }
  return '';
};

const initialState = {
  username: getInitialUsername(),
  isLoggedIn: !!getInitialUsername(),
};

const loginHandler = (state: ReduxUserState, action: ReduxLoginAction) => {
  const { formattedUsername, loginToken } = action.payload;
  state.isLoggedIn = true;
  state.username = formattedUsername;
  Cookies.set('login', loginToken, { expires: 7 });
};

const logoutHandler = (state: ReduxUserState) => {
  state.isLoggedIn = false;
  state.username = '';
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
