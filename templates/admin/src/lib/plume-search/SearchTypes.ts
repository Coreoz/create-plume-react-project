export type Page<T> = {
  elements: T[],
  totalElements: number,
  totalPages: number,
  currentPage: number,
  currentPageSize: number,
  lastPage: boolean,
};

export type PaginationParamsType = {
  page: number,
  limit: number,
};

export type PaginationType = {
  currentPage: number,
  totalPages: number,
  pageSize: number,
  setPage: (page: number) => void,
  setPageSize: (size: number) => void,
  setElementCount: (elementCount: number) => void,
};

export type SearchDataHookType<T> = {
  elements: T[],
  totalElements: number,
  displayMore: () => void,
  hasMore: boolean,
};
