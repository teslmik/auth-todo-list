import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils';

export const useRecoveryPassword = () => {
  const handleMutationFn = (email: string) => userService.recovery(email);

  const handleOnSuccess = () =>
    toast.success('A new password has been sent to the specified email address');

  return useMutation({
    mutationFn: handleMutationFn,
    onSuccess: handleOnSuccess,
    onError: handleError
  });
};
