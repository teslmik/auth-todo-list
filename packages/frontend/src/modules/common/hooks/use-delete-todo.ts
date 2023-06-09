import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import todoService from '../../../services/todos.service';
import { handleError } from '../../../utils';
import { APP_KEYS } from '../consts';

export const useDeleteTodo = () => {
  const client = useQueryClient();

  const handleOnSuccess = () => {
    client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.TODOS] });
    toast.success('Todo is created successfully');
  };
  const handleMatationFn = (id: string) => todoService.deleteTodo(id);

  return useMutation({
    mutationFn: handleMatationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
