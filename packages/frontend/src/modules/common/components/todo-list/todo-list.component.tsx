import React from 'react';
import { useDebounce, useGetAllTodos, useGetAllTodosInfinite, useGlobalContext } from '../../hooks';
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
  const [currentTodo, setCurrentTodo] = React.useState<(ITodo & { userId: string }) | null>(null);

  const { isOpen, setIsOpen } = useGlobalContext();

  const { data: todosData, isLoading } = useGetAllTodos({
    status,
    search: debounce,
    page: page + 1,
    pageSize
  });

  const {
    data: todosInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetAllTodosInfinite({
    status,
    search: debounce,
    pageSize
  });

  if (isLoading || !todosData || !todosInfinite) {
    return <Loader />;
  }

  const handleOpen = (id: string) => {
    const findTodo = todosData.data.filter((todo) => todo.id === id)[0] as ITodo & {
      userId: string;
    };
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
    setIsOpen({ open: true, edit: true });
  };

  const todoListTableProps = {
    todos: todosData,
    handleOpen,
    page,
    setPage,
    pageSize,
    setPageSize
  };

  const todoListProps = {
    data: todosInfinite,
    handleOpen,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  };

  return (
    <>
      {todosData.data.length > 0 ? (
        <>
          <TodoTable {...todoListTableProps} />
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
