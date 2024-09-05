import useNotification, { PlumeNotification } from '@lib/plume-notification/NotificationHook';
import {
  Page, PaginationParamsType, PaginationType, SearchDataHookType,
} from '@lib/plume-search/SearchTypes';
import { useEffect, useState } from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import usePagination from './pagination/PaginationHook';

function useSearchLazyLoadedData<T, U>(
  data: T[],
  filters: Partial<U>,
  loadData: (filters: Partial<U>, pagination: PaginationParamsType) => HttpPromise<Page<T>>,
  defaultPageSize: number = 10,
): SearchDataHookType<T> {
  const { notifyHttpError }: PlumeNotification = useNotification();
  const [elements, setElements] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pagination: PaginationType = usePagination({ pageSize: defaultPageSize });

  const loadPage = (pageNumber: number) => {
    pagination.setPage(pageNumber);
    loadData(
      filters,
      {
        page: pageNumber,
        limit: defaultPageSize,
      },
    )
      .then((page: Page<T>) => {
        setElements((currentElements: T[]) => [...currentElements, ...page.elements]);
        setHasMore(!page.lastPage);
        pagination.setElementCount(page.totalElements);
      })
      .catch(notifyHttpError);
  };

  useEffect(() => {
    setElements([]);
    loadPage(1);
  }, [filters]);

  return {
    elements,
    totalElements: data.length,
    hasMore,
    displayMore: () => loadPage(pagination.currentPage + 1),
  };
}

export default useSearchLazyLoadedData;
