import { Container, Divider } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/components/header';

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Divider variant="middle" />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default MainLayout;
