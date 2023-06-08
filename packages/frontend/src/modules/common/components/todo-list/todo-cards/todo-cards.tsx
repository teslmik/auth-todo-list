import React from 'react';
import { ITodo } from '../../../types';
import { Loader } from '../../loader';
import { TodoItem } from '../todo-item.component';
import { StyledTodoCard } from './todo-cerd.styled';

interface Props {
  todos: ITodo[] | undefined;
  handleOpen: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export const TodoCards: React.FC<Props> = ({ todos, handleOpen, isLoading, isSuccess }) => {
  if (isLoading || !isSuccess || !todos) {
    return <Loader />;
  }
  return (
    <StyledTodoCard>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleOpen={handleOpen} />
      ))}
    </StyledTodoCard>
  );
};
