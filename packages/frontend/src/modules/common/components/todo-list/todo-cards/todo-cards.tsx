import React from 'react';
import { IAllTodosData } from '../../../types';
import { TodoItem } from '../todo-item.component';
import { StyledTodoCard } from './todo-cerd.styled';

interface Props {
  todos: IAllTodosData;
  handleOpen: (id: string) => void;
  // page: number;
  // setPage: React.Dispatch<React.SetStateAction<number>>;
  // pageSize: number;
  // setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoCards: React.FC<Props> = ({
  todos,
  handleOpen
  // page,
  // setPage,
  // pageSize,
  // setPageSize
}) => (
  <StyledTodoCard>
    {todos.data.map((todo) => (
      <TodoItem key={todo.id} todo={todo} handleOpen={handleOpen} />
    ))}
  </StyledTodoCard>
);
