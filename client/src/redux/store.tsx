import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import userReducer, { login } from './user';
import { getSessionStorageItem } from '../utils/sessionStorageFn';
import { getUserDetails } from '../utils/apiService/getRequest/axiosGet';

const store = configureStore({ reducer: { user: userReducer } });

const getUserInfoMiddleware = async (dispatch: any) => {
  const userToken = getSessionStorageItem('login');
  if (!userToken) {
    return;
  }
  try {
    const userData = await getUserDetails();
    const userDataWithIsLogged = { ...userData, isLoggedIn: true };
    dispatch(login({ userData: userDataWithIsLogged, loginToken: userToken }));
  } catch (error) {
    console.log(error);
  }
};

store.dispatch(getUserInfoMiddleware);

function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
