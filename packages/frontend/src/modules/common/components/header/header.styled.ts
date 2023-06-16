import { AppBar } from '@mui/material';
import styled from 'styled-components';

export const StyledAppBar = styled(AppBar)`
  box-shadow: none !important;

  .toolbar {
    width: 100%;
    padding: 0;
  }

  .profile-block {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.SPACES.m};

    p {
      @media (max-width: 360px) {
        display: none;
      }
    }
  }
`;
