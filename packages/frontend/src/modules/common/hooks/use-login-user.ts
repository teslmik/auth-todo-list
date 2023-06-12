import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils/handle-error.util';
import { IUserLogin } from '../types';

export const useLoginUser = (data: IUserLogin) => {
  const handleMatationFn = () => userService.login(data);

  return useMutation({
    mutationFn: handleMatationFn,
    onError: handleError
  });
};
