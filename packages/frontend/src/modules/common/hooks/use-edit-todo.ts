import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { APP_KEYS } from '../consts';
import { ITodo } from '../types';

export const useEditTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ITodo) => todoService.editTodo(payload),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODOS] });
      client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODO, data.id] });
    }
  });
};
