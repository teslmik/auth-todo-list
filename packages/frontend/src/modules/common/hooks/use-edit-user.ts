import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils';
import { APP_KEYS } from '../consts';
import { IUpdateUser } from '../types';

export const useEditUser = () => {
  const client = useQueryClient();

  const handleOnSuccess = () => {
    client.invalidateQueries({ queryKey: [APP_KEYS.QUERY_KEYS.USER] });
  };
  const handleMatationFn = (user: IUpdateUser) => userService.editProfile(user);

  return useMutation({
    mutationFn: handleMatationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
