import { PaginationType, SearchDataHookType } from '@lib/plume-search/SearchTypes';
import { SortOption } from '@lib/plume-search/sorts/SortTypes';
import { useEffect, useState } from 'react';
import usePagination from './pagination/PaginationHook';

type SearchLoadedDataHookOptions<T, F, S extends string> = {
  filters: {
    object: Partial<F>,
    apply: (value: T, filters: Partial<F>) => boolean,
  },
  sort: {
    object: SortOption<S>,
    apply: Record<S, (value: T, compared: T, desc: boolean) => number>,
  },
  defaultPageSize: number,
};

function useSearchLoadedData<T, F, S extends string>(
  data: T[],
  options?: Partial<SearchLoadedDataHookOptions<T, F, S>>,
): SearchDataHookType<T> {
  const [elements, setElements] = useState<T[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const pagination: PaginationType = usePagination({
    pageSize: options?.defaultPageSize ?? 10,
  });

  const displayPage = (page: number) => {
    pagination.setPage(page);
    const filteredElements: T[] = data
      .filter((value: T) => options?.filters?.apply(value, options?.filters?.object) ?? true)
      .sort((value: T, compared: T) => options?.sort?.apply[options?.sort?.object.id](
        value, compared, options?.sort?.object.desc,
      ) ?? 0);

    setTotalElements(filteredElements.length);
    pagination.setElementCount(filteredElements.length);
    setElements(
      (currentElements: T[]) => [
        ...currentElements,
        ...filteredElements.slice(
          (page - 1) * pagination.pageSize,
          page * pagination.pageSize,
        ),
      ]);
  };

  useEffect(() => {
    setElements([]);
    displayPage(1);
  }, [options?.filters?.object, data, options?.sort?.object]);

  return {
    elements,
    totalElements,
    hasMore: pagination.currentPage < pagination.totalPages,
    displayMore: () => displayPage(pagination.currentPage + 1),
  };
}

export default useSearchLoadedData;
