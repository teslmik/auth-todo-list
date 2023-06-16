import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledTodoPage = styled(Box)`
  height: 100%;
  margin-top: ${({ theme }) => theme.SPACES.s};
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: ${({ theme }) => theme.SPACES.m};
  }

  .box-description {
    flex: 1 1 auto;
  }

  .box-completed,
  .box-actions {
    width: 288px;
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.SPACES.l};
    margin-top: ${({ theme }) => theme.SPACES.l};
  }

  .box-button {
    width: 288px;
    margin-bottom: ${({ theme }) => theme.SPACES.l};
    margin-top: ${({ theme }) => theme.SPACES.l};
  }
`;
