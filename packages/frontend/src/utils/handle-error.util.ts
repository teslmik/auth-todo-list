// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { logout } from './logout.util';

export const handleError = (err: AxiosResponse) => {
  if (err.status === 401) {
    logout();
  }

  toast.error(err.data.message);
};
