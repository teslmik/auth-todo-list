import { Box, Card } from '@mui/material';
import styled from 'styled-components';

export const StyledTableActions = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.SPACES.l};
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  @media ${({ theme }) => theme.BREAKPOINTS.mobile} {
    min-height: 0;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .card-title {
    margin-bottom: ${({ theme }) => theme.SPACES.s};
  }

  .card-description {
    flex: 1 1 auto;
    word-wrap: break-word;
  }
`;
