export type Page<T> = {
  items: T[],
  totalCount: number,
  pagesCount: number,
  currentPage: number,
  hasMore: boolean,
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

export type PaginatedSearch<TData> = {
  displayedItems: TData[],
  totalCount: number,
  displayMore: () => void,
  hasMore: boolean,
};
