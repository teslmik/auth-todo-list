import { useQuery } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';

export const useGetOneTodo = (id: string) =>
  useQuery({
    queryFn: () => todoService.getOneTodo(id),
    queryKey: ['todo'],
    onError: (err) => {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      }
    }
  });
