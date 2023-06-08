import { Container, Divider } from '@mui/material';
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
  </>
);

export default MainLayout;
