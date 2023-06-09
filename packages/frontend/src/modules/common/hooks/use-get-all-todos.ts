import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';
import { APP_KEYS } from '../consts';

export const useGetAllTodos = () =>
  useQuery({
    queryFn: () => todoService.getAllTodos(),
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  });
