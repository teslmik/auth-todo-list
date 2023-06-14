import { ButtonType } from '../enums';
import { ITodo } from './todo.type';

export interface HeadCell {
  id: keyof Omit<ITodo, ButtonType.COMPLETED>;
  label: string;
}
