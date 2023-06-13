import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';
import { IUserLogin } from '../types';

export const useLoginUser = () => {
  const handleOnSuccess = (data: string) => {
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data);
  };

  const handleMatationFn = (data: IUserLogin) => userService.login(data);

  return useMutation({
    mutationFn: handleMatationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
