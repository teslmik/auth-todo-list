import { ITodo } from './todo.type';

export interface HeadCell {
  id: keyof Omit<ITodo, 'completed'>;
  label: string;
}
