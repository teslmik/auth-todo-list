import { Container, Divider } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../common/components/header';
import { APP_KEYS } from '../common/consts';

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === `/${APP_KEYS.ROUTER_KEYS.AUTH}` ? null : <Header />}
      <Divider variant="middle" />
      <Container sx={{ height: 'calc(100vh - 98px)' }}>
        <Outlet />
      </Container>
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default MainLayout;
