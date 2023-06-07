import { Box, Button, Switch } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { useDeleteTodo, useEditTodo } from '../../hooks';
import { ITodo } from '../../types';

interface Props {
  row: ITodo;
  handleOpen: (id: string) => void;
}

export const TableActionsCell: React.FC<Props> = ({ row, handleOpen }) => {
  const { mutate: deleteTodo, isLoading: delPending } = useDeleteTodo();
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();

  const navigate = useNavigate();

  return (
    <Box component="div" sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
      <Button
        onClick={() => navigate(`${APP_KEYS.ROUTER_KEYS.TODOS}/${row.id}`)}
        variant="contained"
      >
        View
      </Button>
      <Button onClick={() => handleOpen(row.id)} variant="contained">
        Edit
      </Button>
      <Button disabled={delPending} onClick={() => deleteTodo(row.id)} variant="contained">
        Delete
      </Button>
      <Switch
        checked={row.complited}
        disabled={updPending}
        onChange={() =>
          editTodo({
            id: row.id,
            title: row.title,
            description: row.description,
            complited: !row.complited
            // eslint-disable-next-line prettier/prettier
          })}
      />
    </Box>
  );
};
