import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledTodoCard = styled(Box)`
  display: none;
  visibility: hidden;
  opacity: 0;
  margin-top: ${({ theme }) => theme.SPACES.xl};
  gap: ${({ theme }) => theme.SPACES.m};
  @media ${({ theme }) => theme.BREAKPOINTS.mobile} {
    display: flex;
    flex-direction: column;
    visibility: visible;
    opacity: 1;
  }
`;
