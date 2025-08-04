export type PaginatedData<T> = {
  content: T[];
  totalElements: number;
  number: number;
  size: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PageParams = {
  page?: number;
  size?: number;
};
