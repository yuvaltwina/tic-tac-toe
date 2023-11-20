import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import userReducer from './user';
import { getSessionStorageItem } from '../utils/sessionStorageFn';

const store = configureStore({ reducer: { user: userReducer } });

const getUserInfoMiddleware = async (dispatch: any, getState: any) => {
  const userToken = getSessionStorageItem('login');
  if (!userToken) {
    return;
  }
  dispatch()
};

store.dispatch(getUserInfoMiddleware);

function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
