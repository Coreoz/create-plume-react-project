import useNotification, { PlumeNotification } from '@lib/plume-notification/NotificationHook';
import {
  Page, PaginationParamsType, PaginationType, SearchDataHookType,
} from '@lib/plume-search/SearchTypes';
import { useEffect, useState } from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import usePagination from './pagination/PaginationHook';

type SearchLazyLoadedDataOptions<F, S> = {
  filters: Partial<F>,
  sort: S,
  defaultPageSize: number,
};

function useSearchLazyLoadedData<T, F, S extends string>(
  loadData: (
    filters: Partial<F> | undefined,
    sort: S | undefined,
    pagination: PaginationParamsType | undefined,
  ) => HttpPromise<Page<T>>,
  options: Partial<SearchLazyLoadedDataOptions<F, S>>,
): SearchDataHookType<T> {
  const { notifyHttpError }: PlumeNotification = useNotification();
  const [elements, setElements] = useState<T[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pagination: PaginationType = usePagination({ pageSize: options?.defaultPageSize ?? 10 });

  const loadPage = (pageNumber: number) => {
    pagination.setPage(pageNumber);
    loadData(
      options?.filters,
      options?.sort,
      {
        page: pageNumber,
        limit: pagination.pageSize,
      },
    )
      .then((page: Page<T>) => {
        setElements((currentElements: T[]) => [...currentElements, ...page.elements]);
        setTotalElements(page.totalElements);
        setHasMore(!page.lastPage);
        pagination.setElementCount(page.totalElements);
      })
      .catch(notifyHttpError);
  };

  useEffect(() => {
    setElements([]);
    loadPage(1);
  }, [options?.filters ?? {}, options?.sort ?? {}]);

  return {
    elements,
    totalElements,
    hasMore,
    displayMore: () => loadPage(pagination.currentPage + 1),
  };
}

export default useSearchLazyLoadedData;
