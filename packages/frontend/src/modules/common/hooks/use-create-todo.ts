import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';
import { APP_KEYS } from '../consts';
import { ITodoCreate } from '../types';

export const useCreateTodos = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ITodoCreate) => todoService.createTodo(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODOS] });
      toast.success('Todo is created successfully');
    }
  });
};
