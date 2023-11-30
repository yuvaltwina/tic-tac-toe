/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import {
  deleteSessionStorageItem,
  setSessionStorageItem,
} from '../utils/sessionStorageFn';
import { UserSliceState } from './types/slices';

type ReduxLoginAction = {
  payload: { loginToken: string, userData: UserSliceState['userData'] };
};
const userDataInitialValues: UserSliceState['userData'] = {
  imageId: 0,
  points: 0,
  userId: 0,
  username: '',
  isLoggedIn: false,
};

const initialState = {
  userData: {
    ...userDataInitialValues,
  },
};

const loginHandler = (state: UserSliceState, action: ReduxLoginAction) => {
  const { userData, loginToken } = action.payload;
  try {
    state.userData = userData;
    setSessionStorageItem('login', loginToken);
  } catch (error) {
    console.log(error);
  }
};

const logoutHandler = (state: UserSliceState) => {
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
