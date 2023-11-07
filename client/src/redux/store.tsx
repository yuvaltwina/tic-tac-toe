import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import userReducer from './user';

const store = configureStore({ reducer: { user: userReducer } });

function StoreProvider({ children }: { children: ReactNode }) { return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
