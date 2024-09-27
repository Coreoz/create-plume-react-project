import useNotification, { PlumeNotification } from '@lib/plume-notification/NotificationHook';
import {
  Page, PaginationParamsType, PaginationType, PaginatedSearch,
} from '@lib/plume-search/SearchTypes';
import { SortOption } from '@lib/plume-search/sorts/SortTypes';
import { useEffect, useState } from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import usePagination from './pagination/PaginationHook';

type SearchLazyLoadedDataOptions<TFilter, TSort extends string> = {
  filterValues: Partial<TFilter>,
  sort: SortOption<TSort>,
  defaultPageSize: number,
};

/**
 * Hook to handle API call search with pagination
 * This search relies on results and pagination provided by the API call
 *
 * @param loadData the paginated search API call
 * @param options the options to apply to the search
 * @return displayedItems the elements to display
 * @return totalCount total elements of the list you are paginating
 * @return hasMore boolean set to false if at the end of the list you are paginating
 * @return onDisplayMore function to call to display the next page of the list you are paginating
 */
function useApiPaginatedSearch<TData, TFilter, TSort extends string>(
  loadData: (
    filterValues: Partial<TFilter>,
    sort: SortOption<TSort> | undefined,
    pagination: PaginationParamsType | undefined,
  ) => HttpPromise<Page<TData>>,
  options: Partial<SearchLazyLoadedDataOptions<TFilter, TSort>>,
): PaginatedSearch<TData> {
  const { notifyHttpError }: PlumeNotification = useNotification();
  const [elements, setElements] = useState<TData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pagination: PaginationType = usePagination({ pageSize: options?.defaultPageSize ?? 10 });

  const loadPage = (pageNumber: number) => {
    pagination.setPage(pageNumber);
    loadData(
      options?.filterValues ?? {},
      options?.sort,
      {
        page: pageNumber,
        limit: pagination.pageSize,
      },
    )
      .then((page: Page<TData>) => {
        setElements((currentElements: TData[]) => [...currentElements, ...page.items]);
        setTotalCount(page.totalCount);
        setHasMore(page.hasMore);
        pagination.setElementCount(page.totalCount);
      })
      .catch(notifyHttpError);
  };

  useEffect(() => {
    setElements([]);
    loadPage(1);
  }, [options?.filterValues ?? {}, options?.sort ?? {}]);

  return {
    displayedItems: elements,
    totalCount,
    hasMore,
    onDisplayMore: () => loadPage(pagination.currentPage + 1),
  };
}

export default useApiPaginatedSearch;
