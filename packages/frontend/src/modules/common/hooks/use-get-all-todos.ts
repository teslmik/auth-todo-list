import { useQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';
import { ITodoQueries } from '../types';

export const useGetAllTodos = (queries: ITodoQueries) => {
  const handleQueryFn = () => todoService.getAllTodos(queries);

  return useQuery({
    queryFn: handleQueryFn,
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS, queries.status, queries.search],
    onError: handleError
  });
};
