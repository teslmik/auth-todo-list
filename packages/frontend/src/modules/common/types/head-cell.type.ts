import { ITodo } from './todo.type';

export interface HeadCell {
  id: keyof Omit<ITodo, 'complited'>;
  label: string;
}
