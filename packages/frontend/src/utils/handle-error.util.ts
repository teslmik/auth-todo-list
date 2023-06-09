import toast from 'react-hot-toast';

export const handleError = (err: Error) => {
  if (err instanceof Error) {
    toast.error(err.message);
  }
};
