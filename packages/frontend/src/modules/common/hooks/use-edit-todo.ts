import { useMutation, useQueryClient } from '@tanstack/react-query';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils';
import { APP_KEYS } from '../consts';
import { ITodo } from '../types';

export const useEditTodo = () => {
  const client = useQueryClient();

  const handleOnSuccess = (data: ITodo) => {
    client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODOS] });
    client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODO, data.id] });
  };
  const handleMatationFn = (todo: ITodo) => todoService.editTodo(todo);

  return useMutation({
    mutationFn: handleMatationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
