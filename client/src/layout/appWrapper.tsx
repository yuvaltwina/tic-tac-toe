import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from '../utils/reduxState/store';

interface AppWrapperProps {
  children: ReactNode;
}
function AppWrapper({ children }: AppWrapperProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
    </QueryClientProvider>
  );
}

export default AppWrapper;
