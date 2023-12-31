import styled from 'styled-components';

export const editModalStyled = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3
};

export const StyledTextFields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
