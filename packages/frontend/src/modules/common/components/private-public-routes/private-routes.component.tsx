import React from 'react';
import { Navigate } from 'react-router-dom';
import { APP_KEYS } from '../../consts';

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('TOKEN') !== null;

  return isAuthenticated ? children : <Navigate to={APP_KEYS.ROUTER_KEYS.AUTH} replace />;
};
