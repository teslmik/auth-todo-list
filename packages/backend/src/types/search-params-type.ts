import { TodoStatus } from '../enums';

export interface ISearchParams {
  search?: string;
  page: number;
  pageSize: number;
  status?: TodoStatus;
}
