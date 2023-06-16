import { Alert, Box } from '@mui/material';
import styled from 'styled-components';

export const StyledBoxMain = styled(Box)`
  display: flex;
  margin-top: ${({ theme }) => theme.SPACES.xl};
  gap: 32px;

  @media ${({ theme }) => theme.BREAKPOINTS.tablet} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
  }

  @media ${({ theme }) => theme.BREAKPOINTS.mobile} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
  }
`;

export const StyledAlertMain = styled(Alert)`
  disply: flex;
  align-items: center;
  position: relative;
  top: 50%;
  transform: translateY(-100%);
`;
