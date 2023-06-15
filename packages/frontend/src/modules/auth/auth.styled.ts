import { Container, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.SPACES.l};
  overflow: hidden;
`;

export const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACES.l};
`;

export const StyledTitle = styled(Typography)`
  display: block;
  margin-top: ${({ theme }) => theme.SPACES.xl} !important;
`;
