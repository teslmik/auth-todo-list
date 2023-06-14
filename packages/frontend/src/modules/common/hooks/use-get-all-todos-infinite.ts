import { useInfiniteQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';
import { IAllTodosData, ITodoQueries } from '../types';

export const useGetAllTodosInfinite = (queries: ITodoQueries) => {
  const handleQueryFn = ({ pageParam = 1 }) => {
    queries.page = pageParam;
    return todoService.getAllTodos(queries);
  };

  const handleNexPage = ({ currentPage, totalPages }: IAllTodosData) => {
    if (currentPage < totalPages) {
      return Number(currentPage) + 1;
    }
    return undefined;
  };

  return useInfiniteQuery({
    queryFn: handleQueryFn,
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS, queries],
    onError: handleError,
    getNextPageParam: handleNexPage
  });
};
