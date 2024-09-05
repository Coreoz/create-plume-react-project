import { PaginationType, SearchDataHookType } from '@lib/plume-search/SearchTypes';
import { useEffect, useState } from 'react';
import usePagination from './pagination/PaginationHook';

function useSearchLoadedData<T, U>(
  data: T[],
  filters: {
    object: Partial<U>,
    apply: (value: T, filters: Partial<U>) => boolean,
  },
  defaultPageSize: number = 10,
): SearchDataHookType<T> {
  const [elements, setElements] = useState<T[]>([]);
  const pagination: PaginationType = usePagination({
    pageSize: defaultPageSize,
  });

  const displayPage = (page: number) => {
    pagination.setPage(page);
    const filteredElements: T[] = data.filter((value: T) => filters.apply(value, filters.object));
    pagination.setElementCount(filteredElements.length);
    setElements(
      (currentElements: T[]) => [
        ...currentElements,
        ...filteredElements.slice(
          (page - 1) * defaultPageSize,
          page * defaultPageSize,
        ),
      ]);
  };

  useEffect(() => {
    setElements([]);
    displayPage(1);
  }, [filters.object, data]);

  return {
    elements,
    totalElements: data.length,
    hasMore: pagination.currentPage < pagination.totalPages,
    displayMore: () => displayPage(pagination.currentPage + 1),
  };
}

export default useSearchLoadedData;
