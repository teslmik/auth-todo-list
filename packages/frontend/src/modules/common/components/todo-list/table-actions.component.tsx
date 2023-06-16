import { Button, ButtonGroup, Switch } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS, buttonGroupActions } from '../../consts';
import { useDeleteTodo, useEditTodo, useGetUser } from '../../hooks';
import { ITodo } from '../../types';
import { StyledTableActions } from './todo-list.styled';

interface Props {
  row: ITodo & { userId: string };
  handleOpen: (id: string) => void;
}

export const TableActionsCell: React.FC<Props> = ({ row, handleOpen }) => {
  const navigate = useNavigate();

  const { data } = useGetUser();
  const { mutate: deleteTodo, isLoading: delPending } = useDeleteTodo();
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();

  const isDisabled = row.userId === data?.id;

  const buttonActionHandlers = [
    () => navigate(`${APP_KEYS.ROUTER_KEYS.TODOS}/${row.id}`),
    () => {
      handleOpen(row.id);
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
    <StyledTableActions component="div">
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {buttonGroupActions.map((button, index) => (
          <Button
            disabled={delPending || updPending || (button.label === 'Delete' && !isDisabled)}
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
    </StyledTableActions>
  );
};
