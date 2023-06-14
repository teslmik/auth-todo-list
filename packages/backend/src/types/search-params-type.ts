import { TodoStatus } from '../enums';

export interface ISearchParams {
  search?: string;
  status?: Omit<TodoStatus, TodoStatus.ALL>;
}
