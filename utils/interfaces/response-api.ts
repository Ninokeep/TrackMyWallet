export interface ResponseApi<T> {
  items: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
