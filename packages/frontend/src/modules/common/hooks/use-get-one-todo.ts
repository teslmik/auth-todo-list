import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';

export const useGetOneTodo = (id: string) =>
  useQuery({
    queryFn: () => todoService.getOneTodo(id),
    queryKey: ['todo', id],
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  });
