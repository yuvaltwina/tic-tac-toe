import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSessionStorageItem } from '../../utils/sessionStorageFn';

function RequireAuth({ children }: { children: React.JSX.Element }) {
  const token = getSessionStorageItem('login');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default RequireAuth;
