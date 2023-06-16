import { Box } from '@mui/material';
import styled from 'styled-components';

export const StylesBox = styled(Box)`
  width: 100%;
  margin-top: ${({ theme }) => theme.SPACES.xl};
  display: block;

  .paper {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.SPACES.m};
  }

  table {
    min-width: 750 px;
  }
`;
