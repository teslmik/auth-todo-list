import React from 'react';
import { ITodo } from '../../../types';
import { TodoItem } from '../todo-item.component';
import { StyledTodoCard } from './todo-cerd.styled';

interface Props {
  todos: ITodo[];
  handleOpen: (id: string) => void;
}

export const TodoCards: React.FC<Props> = ({ todos, handleOpen }) => (
  <StyledTodoCard>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} handleOpen={handleOpen} />
    ))}
  </StyledTodoCard>
);
