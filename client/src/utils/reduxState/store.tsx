import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import userReducer from './user';

const store = configureStore({ reducer: { user: userReducer } });

function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export default StoreProvider;

// export default store;
