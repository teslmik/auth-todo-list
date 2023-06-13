export interface ISearchParams {
  search?: string;
  status?: 'all' | 'public' | 'private' | 'completed';
  page: number;
  pageSize: number;
}
