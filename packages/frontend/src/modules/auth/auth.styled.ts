import { Container } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.SPACES.l};
  height: 100vh;
`;

export const StyledForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACES.l};
`;
