import { ButtonType } from '../enums';

export interface ITodoQueries {
  status: ButtonType;
  search: string;
  page?: number;
  pageSize: number;
}
