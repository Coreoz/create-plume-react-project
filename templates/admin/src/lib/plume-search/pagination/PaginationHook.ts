import { PaginationType } from '@lib/plume-search/SearchTypes';
import { useState } from 'react';

type UsePaginationProps = {
  pageSize: number,
};

function usePagination({ pageSize }: UsePaginationProps): PaginationType {
  const [elementCount, setElementCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const totalPages: number = Math.ceil(elementCount / currentPageSize);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setPageSize = (size: number) => {
    setCurrentPageSize(size);
    setPage(1);
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    setPage,
    setElementCount,
    setPageSize,
  };
}

export default usePagination;
