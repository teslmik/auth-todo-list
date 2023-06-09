import { Typography } from '@mui/material';
import React from 'react';
import { EmptyDataStyled } from './empty-data.styled';

import EmptyImg from '../../../../assets/image/empty-data.svg';

export const EmptyData: React.FC<{ message: string }> = ({ message }) => (
  <EmptyDataStyled>
    <img src={EmptyImg} alt="Empty data" />
    <Typography align="center">{message}</Typography>
  </EmptyDataStyled>
);
