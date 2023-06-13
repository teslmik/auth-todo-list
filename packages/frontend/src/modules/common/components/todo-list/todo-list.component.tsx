import React from 'react';
import { useDebounce, useGetAllTodos, useGlobalContext } from '../../hooks';
import { ITodo, ButtonType } from '../../types';
import { EditModal } from '../edit-modal';
import { EmptyData } from '../empti-data-placeholder/empty-data.component';
import { Loader } from '../loader';
import { TodoCards } from './todo-cards/todo-cards';
import { TodoSlider } from './todo-slider/todo-slider.component';
import { TodoTable } from './todo-table/todo-table.component';

interface Props {
  status: ButtonType;
  search: string;
}

export const TodoList: React.FC<Props> = ({ status, search }) => {
  const debounce = useDebounce(search);

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [currentTodo, setCurrentTodo] = React.useState<ITodo | null>(null);

  const { isOpen, setIsOpen } = useGlobalContext();

  const { data: todosData, isLoading } = useGetAllTodos({
    status,
    search: debounce,
    page,
    pageSize
  });

  if (isLoading || !todosData) {
    return <Loader />;
  }

  const handleOpen = (id: string) => {
    const findTodo = todosData.data.filter((todo) => todo.id === id)[0];
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
    setIsOpen({ open: true, edit: true });
  };

  const todoListProps = {
    todos: todosData,
    handleOpen,
    page,
    setPage,
    pageSize,
    setPageSize
  };

  return (
    <>
      {todosData.data.length > 0 ? (
        <>
          <TodoTable {...todoListProps} />
          <TodoSlider {...todoListProps} />
          <TodoCards {...todoListProps} />
        </>
      ) : (
        <EmptyData message={"You don't have any todos yet"} />
      )}
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} todo={currentTodo} />
    </>
  );
};
