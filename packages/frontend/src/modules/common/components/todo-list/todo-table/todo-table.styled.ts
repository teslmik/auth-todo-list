import { Box } from '@mui/material';
import styled from 'styled-components';

export const StylesBox = styled(Box)`
  width: '100%';
  margin-top: 15px;
  display: none;
  visibility: hidden;
  opacity: 0;
  @media ${({ theme }) => theme.BREAKPOINTS.desktop} {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;
