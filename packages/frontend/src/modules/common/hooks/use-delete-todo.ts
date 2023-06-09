import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';
import { APP_KEYS } from '../consts';

export const useDeleteTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODOS] });
      toast.success('Todo deleted successfully');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  });
};
