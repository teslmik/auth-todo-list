import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';

export const useGetOneTodo = (id: string) => {
  const notify = (message: string) => toast(message);

  return useQuery({
    queryFn: () => todoService.getOneTodo(id),
    queryKey: ['todo', id],
    onError: (err) => {
      if (err instanceof Error) {
        notify(err.message);
      }
    }
  });
};
