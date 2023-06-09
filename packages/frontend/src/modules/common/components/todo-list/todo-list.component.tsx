import React from 'react';
import { useGetAllTodos, useGlobalContext } from '../../hooks';
import { ITodo } from '../../types';
import { EditModal } from '../edit-modal';
import { EmptyData } from '../empti-data-placeholder/empty-data.component';
import { Loader } from '../loader';
import { TodoCards } from './todo-cards/todo-cards';
import { TodoSlider } from './todo-slider/todo-slider.component';
import { TodoTable } from './todo-table/todo-table.component';

export const TodoList: React.FC = () => {
  const { data: todos, isLoading } = useGetAllTodos();
  const { isOpen, setIsOpen } = useGlobalContext();
  const [currentTodo, setCurrentTodo] = React.useState<ITodo | null>(null);

  const handleOpen = (id: string) => {
    const findTodo = todos?.filter((todo) => todo.id === id)[0];
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
    setIsOpen({ open: true, edit: true });
  };

  if (isLoading || !todos) {
    return <Loader />;
  }

  return (
    <>
      {todos?.length > 0 ? (
        <>
          <TodoTable todos={todos} handleOpen={handleOpen} />
          <TodoSlider todos={todos} handleOpen={handleOpen} />
          <TodoCards todos={todos} handleOpen={handleOpen} />
        </>
      ) : (
        <EmptyData message={"You don't have any todos yet"} />
      )}
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} todo={currentTodo} />
    </>
  );
};
