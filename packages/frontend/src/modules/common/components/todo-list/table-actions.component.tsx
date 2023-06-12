import { Box, Button, ButtonGroup, Switch } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS, buttonGroupActions } from '../../consts';
import { useDeleteTodo, useEditTodo, useGetOneTodo } from '../../hooks';
import { ITodo } from '../../types';

interface Props {
  row: ITodo;
  handleOpen: (id: string) => void;
}

export const TableActionsCell: React.FC<Props> = ({ row, handleOpen }) => {
  const navigate = useNavigate();

  const { mutate: deleteTodo, isLoading: delPending } = useDeleteTodo();
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();
  const { refetch } = useGetOneTodo(row.id);

  const buttonActionHandlers = [
    () => navigate(`${APP_KEYS.ROUTER_KEYS.TODOS}/${row.id}`),
    () => {
      handleOpen(row.id);
      refetch();
    },
    () => deleteTodo(row.id)
  ];

  const handleEditTodo = () =>
    editTodo({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: !row.completed,
      private: row.private
    });

  return (
    <Box component="div" sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {buttonGroupActions.map((button, index) => (
          <Button
            disabled={delPending || updPending}
            size="small"
            key={button.label}
            color={button.color}
            onClick={buttonActionHandlers[index]}
          >
            {button.label}
          </Button>
        ))}
      </ButtonGroup>
      <Switch checked={row.completed} disabled={updPending} onChange={handleEditTodo} />
    </Box>
  );
};
