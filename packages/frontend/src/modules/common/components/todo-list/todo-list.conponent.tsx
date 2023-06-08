import React from 'react';
import { useGetAllTodos, useGlobalContext } from '../../hooks';
import { ITodo } from '../../types';
import { EditModal } from '../edit-modal';
import { TodoCards } from './todo-cards/todo-cards';
import { TodoSlider } from './todo-slider/todo-slider.component';
import { TodoTable } from './todo-table/todo-table.component';

export const TodoList: React.FC = () => {
  const { data: todos, isSuccess, isLoading } = useGetAllTodos();
  const { isOpen, setIsOpen } = useGlobalContext();
  const [currentTodo, setCurrentTodo] = React.useState<ITodo | null>(null);

  const handleOpen = (id: string) => {
    const findTodo = todos?.filter((todo) => todo.id === id)[0];
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
    setIsOpen({ open: true, edit: true });
  };

  return (
    <>
      <TodoTable
        todos={todos}
        handleOpen={handleOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <TodoSlider
        todos={todos}
        handleOpen={handleOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <TodoCards
        todos={todos}
        handleOpen={handleOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} todo={currentTodo} />
    </>
  );
};
