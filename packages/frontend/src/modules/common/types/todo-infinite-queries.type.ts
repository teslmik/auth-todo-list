import { IAllTodosData } from './all-todos-data.type';

export interface ITodoInfiniteQueries {
  pageParams: number[];
  pages: IAllTodosData[];
}
