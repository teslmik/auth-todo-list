import React from 'react';
import { Box, CardContent, Typography, CardActions } from '@mui/material';
import { TableActionsCell } from './table-actions.component';
import { ITodo } from '../../types';
import { StyledCard } from './todo-list.styled';

interface Props {
  todo: ITodo & { userId: string };
  handleOpen: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, handleOpen }) => (
  <Box>
    <StyledCard variant="outlined">
      <CardContent className="card-content">
        <Typography className="card-title" variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography className="card-description" variant="body1">
          {todo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <TableActionsCell row={todo} handleOpen={handleOpen} />
      </CardActions>
    </StyledCard>
  </Box>
);
