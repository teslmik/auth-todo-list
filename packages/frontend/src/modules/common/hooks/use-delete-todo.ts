import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';

export const useDeleteTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ['todos'] }),
    onError: (err) => {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      }
    }
  });
};
