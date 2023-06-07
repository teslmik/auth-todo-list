import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { ITodo } from '../types';

export const useEditTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ITodo) => todoService.editTodo(payload),
    onSuccess: () => client.invalidateQueries({ queryKey: ['todos'] })
  });
};
