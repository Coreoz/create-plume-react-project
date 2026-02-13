import { PaginatedSearch, PaginationType } from '@lib/plume-search/SearchTypes';
import { SortOption } from '@lib/plume-search/sorts/SortTypes';
import { useEffect, useState } from 'react';
import usePagination from './pagination/PaginationHook';

type SearchLoadedDataHookOptions<TData, TFilter, TSort extends string> = {
  filter: {
    values: Partial<TFilter>,
    isElementDisplayed: (value: TData, filters: Partial<TFilter>) => boolean,
  },
  sort: {
    value: SortOption<TSort>,
    sortElement: Record<TSort, (value: TData, compared: TData, isDesc: boolean) => number>,
  },
  defaultPageSize: number,
};

/**
 * Hook to handle search with pagination with data already loaded
 * This search relies on results provided in the parameters
 *
 * @param data the loaded data to be paginated
 * @param options options to apply to the given data
 * filter : provide the filter values and the function to apply it
 * sort : provide the sort object and the function to apply it
 *
 * @return displayedItems the elements to display
 * @return totalCount total elements of the list you are paginating
 * @return hasMore boolean set to false if at the end of the list you are paginating
 * @return onDisplayMore function to call to display the next page of the list you are paginating
 */
function useInMemoryPaginatedSearch<TData, TFilter, TSort extends string>(
  data: TData[],
  options?: Partial<SearchLoadedDataHookOptions<TData, TFilter, TSort>>,
): PaginatedSearch<TData> {
  const [elements, setElements] = useState<TData[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const pagination: PaginationType = usePagination({
    pageSize: options?.defaultPageSize ?? 10,
  });

  const displayPage = (page: number) => {
    pagination.setPage(page);
    const filteredElements: TData[] = data
      .filter((value: TData) => options?.filter?.isElementDisplayed(value, options?.filter?.values) ?? true)
      .sort((value: TData, compared: TData) => (options?.sort
        ? (options.sort.sortElement[options.sort.value.id](value, compared, options.sort.value.desc) ?? 0)
        : 0),
      );

    setTotalElements(filteredElements.length);
    pagination.setElementCount(filteredElements.length);
    setElements(
      (currentElements: TData[]) => [
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
  }, [options?.filter?.values, data, options?.sort?.value]);

  return {
    displayedItems: elements,
    totalCount: totalElements,
    hasMore: pagination.currentPage < pagination.totalPages,
    onDisplayMore: () => displayPage(pagination.currentPage + 1),
  };
}

export default useInMemoryPaginatedSearch;
