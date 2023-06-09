import React from 'react';
import styled from 'styled-components';
import { Box, Card, CardContent, Typography, CardActions } from '@mui/material';
import { TableActionsCell } from './table-actions.component';
import { ITodo } from '../../types';

interface Props {
  todo: ITodo;
  handleOpen: (id: string) => void;
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  @media ${({ theme }) => theme.BREAKPOINTS.mobile} {
    min-height: 0;
  }
`;

export const TodoItem: React.FC<Props> = ({ todo, handleOpen }) => (
  <Box>
    <StyledCard variant="outlined">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography variant="body1" sx={{ flex: '1 1 auto', wordWrap: 'break-word' }}>
          {todo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <TableActionsCell row={todo} handleOpen={handleOpen} />
      </CardActions>
    </StyledCard>
  </Box>
);
