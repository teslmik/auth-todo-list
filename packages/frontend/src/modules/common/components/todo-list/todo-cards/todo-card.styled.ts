import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledTodoCard = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.SPACES.xl};
  gap: ${({ theme }) => theme.SPACES.m};
`;
