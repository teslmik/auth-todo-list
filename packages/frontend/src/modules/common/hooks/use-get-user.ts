import { useQuery } from '@tanstack/react-query';
import userService from '../../../services/user.service';
import { handleError } from '../../../utils/handle-error.util';
import { APP_KEYS } from '../consts';

export const useGetUser = () => {
  const isAuthenticated = localStorage.getItem('TOKEN') !== null;

  const handleQueryFn = () => userService.getUser();

  return useQuery({
    queryFn: handleQueryFn,
    queryKey: [APP_KEYS.QUERY_KEYS.USER],
    onError: handleError,
    enabled: isAuthenticated && window.location.pathname !== '/auth'
  });
};
