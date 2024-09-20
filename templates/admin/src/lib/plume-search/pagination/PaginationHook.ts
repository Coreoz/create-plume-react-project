import { PaginationType } from '@lib/plume-search/SearchTypes';
import { useState } from 'react';

type UsePaginationProps = {
  pageSize: number,
};

/**
 * Hook to handle pagination numbers
 * @note this hook does not handle the list itself, only navigation through pages
 *
 * @param pageSize the size of a page in the pagination
 * @return currentPage the current page shown
 * @return totalPages total pages of the list
 * @return pageSize the size of a page in the pagination
 * @return setPage function to update the page
 * @return setElementCount function to set the number of elements
 * @return setPageSize function to update the page size of elements
 */
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
