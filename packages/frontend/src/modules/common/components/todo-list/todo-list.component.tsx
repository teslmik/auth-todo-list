import React from 'react';
import { ButtonType } from '../../enums';
import { useDebounce, useGetAllTodos, useGetAllTodosInfinite, useGlobalContext } from '../../hooks';
import { ITodo } from '../../types';
import { EditModal } from '../edit-modal';
import { EmptyData } from '../empti-data-placeholder/empty-data.component';
import { Loader } from '../loader';
import { TodoCards } from './todo-cards/todo-cards';
import { TodoSlider } from './todo-slider/todo-slider.component';
import { TodoTable } from './todo-table/todo-table.component';

interface Props {
  status: ButtonType;
  search: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoList: React.FC<Props> = ({ status, search, page, setPage }) => {
  const debounce = useDebounce(search);

  const [pageSize, setPageSize] = React.useState(5);
  const [currentTodo, setCurrentTodo] = React.useState<(ITodo & { userId: string }) | null>(null);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        windowWidth >= 768 ? (
          <TodoTable {...todoListTableProps} />
        ) : windowWidth <= 425 ? (
          <TodoCards {...todoListProps} />
        ) : (
          <TodoSlider {...todoListProps} />
        )
      ) : (
        <EmptyData message={"You don't have any todos yet"} />
      )}
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} todo={currentTodo} />
    </>
  );
};
