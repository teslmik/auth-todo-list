import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { ITodoCreate } from '../types';

export const useCreateTodos = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ITodoCreate) => todoService.createTodo(payload),
    onSuccess: () => client.invalidateQueries({ queryKey: ['todos'] })
  });
};
