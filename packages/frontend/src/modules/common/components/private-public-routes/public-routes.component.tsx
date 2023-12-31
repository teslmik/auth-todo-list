import React from 'react';
import { Navigate } from 'react-router-dom';
import { APP_KEYS } from '../../consts';

export const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN) !== null;

  return isAuthenticated ? <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} replace /> : children;
};
