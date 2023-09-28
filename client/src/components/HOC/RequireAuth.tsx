import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }: { children: React.JSX.Element }) {
  const token = Cookies.get('login');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default RequireAuth;
