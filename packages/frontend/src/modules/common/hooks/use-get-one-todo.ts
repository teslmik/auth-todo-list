import { useQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';

export const useGetOneTodo = (id: string) => {
  const handleQueryFn = () => todoService.getOneTodo(id);

  return useQuery({
    queryFn: handleQueryFn,
    queryKey: [APP_KEYS.QUERY_KEYS.TODO, id],
    onError: handleError
  });
};
