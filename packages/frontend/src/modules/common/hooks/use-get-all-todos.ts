import { useQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';

export const useGetAllTodos = () => {
  const handleQueryFn = () => todoService.getAllTodos();

  return useQuery({
    queryFn: handleQueryFn,
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    onError: handleError
  });
};
