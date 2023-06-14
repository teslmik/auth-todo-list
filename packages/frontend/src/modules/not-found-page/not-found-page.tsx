import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { StyledNotFound } from './not-found.styled';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const onRedirect = () => navigate(APP_KEYS.ROUTER_KEYS.ROOT);

  return (
    <StyledNotFound>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you requested was not found</p>
      <Button size="large" onClick={onRedirect} variant="contained">
        Go to Home
      </Button>
    </StyledNotFound>
  );
};
