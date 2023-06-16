import { CircularProgress } from '@mui/material';
import React from 'react';
import { StyledLoader } from './loader.styled';

export const Loader: React.FC = () => (
  <StyledLoader>
    <CircularProgress />
  </StyledLoader>
);
