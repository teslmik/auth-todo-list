import { ButtonType } from './bottun-group.type';

export interface ITodoQueries {
  status: ButtonType;
  search: string;
  page?: number;
  pageSize: number;
}
