import { ITodo } from './todo.type';

export interface IAllTodosData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: ITodo[];
}
