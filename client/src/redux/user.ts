/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import {
  deleteSessionStorageItem,
  setSessionStorageItem,
} from '../utils/sessionStorageFn';
import { UserSliceState } from './types/slices';
import { refresh } from '../utils/data';

type ReduxLoginAction = {
  payload: { loginToken: string; userData: UserSliceState['userData'] };
};

type ReduxUpdateUserData = {
  payload: Partial<UserSliceState['userData']>;
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

const updateUserData = (state: UserSliceState, action: ReduxUpdateUserData) => {
  const userData = action.payload;
  state.userData = { ...state.userData, ...userData };
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: loginHandler,
    logout: logoutHandler,
    updateData: updateUserData,
  },
});

export const { login, logout, updateData } = counterSlice.actions;
export default counterSlice.reducer;
