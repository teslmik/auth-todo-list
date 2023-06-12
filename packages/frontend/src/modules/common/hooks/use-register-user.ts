import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils/handle-error.util';
import { IUserLogin } from '../types';

export const useRegisterUser = () => {
  const handleOnSuccess = (data: string) => {
    localStorage.setItem('TOKEN', data);
  };

  const handleMatationFn = (data: IUserLogin) => userService.registration(data);

  return useMutation({
    mutationFn: handleMatationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
