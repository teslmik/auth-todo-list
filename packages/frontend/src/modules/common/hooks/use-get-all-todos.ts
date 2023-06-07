import { useQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';

export const useGetAllTodos = () =>
  useQuery({
    queryFn: () => todoService.getAllTodos(),
    queryKey: ['todos'],
    onError: (err) => {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      }
    }
  });
