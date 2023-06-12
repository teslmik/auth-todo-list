// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (err: AxiosResponse) => {
  if (err) {
    toast.error(err.data.message);
  }
};
