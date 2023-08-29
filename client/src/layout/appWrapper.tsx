import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface AppWrapperProps {
  children: ReactNode;
}
function AppWrapper({ children }: AppWrapperProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default AppWrapper;
