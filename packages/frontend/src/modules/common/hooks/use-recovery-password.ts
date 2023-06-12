import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils';

export const useRecoveryPassword = () => {
  const handleMatationFn = (email: string) => userService.recovery(email);

  return useMutation({
    mutationFn: handleMatationFn,
    onError: handleError
  });
};
