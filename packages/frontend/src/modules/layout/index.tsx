import { Container, Divider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/components/header';

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Divider variant="middle" />
    <Container sx={{ height: 'calc(100vh - 74px)' }}>
      <Outlet />
    </Container>
    <div>
      <Toaster />
    </div>
  </>
);

export default MainLayout;
