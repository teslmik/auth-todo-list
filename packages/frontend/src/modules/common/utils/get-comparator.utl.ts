import { Order } from '../enums';
import { descendingComparator } from './descending-comparator.util';

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  if (order === 'desc') {
    return (a, b) => descendingComparator(a, b, orderBy);
  }
  return (a, b) => -descendingComparator(a, b, orderBy);
};
