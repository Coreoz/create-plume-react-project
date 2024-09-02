import { useEffect, useState } from 'react';

export type FilteredObjectsHookType<T> = {
  elements: T[],
  totalElements: number,
};

function useFilteredObjects<T, U>(
  data: T[],
  filterObject: Partial<U>,
  filterFunction: (filters: Partial<U>) => (value: T) => boolean,
  shouldApplyFilters: (data: T[], filters: Partial<U>) => boolean,
): FilteredObjectsHookType<T> {
  const [elements, setElements] = useState<T[]>([]);

  useEffect(() => {
    if (shouldApplyFilters(data, filterObject)) {
      setElements(data.filter(filterFunction(filterObject)));
      return;
    }
    setElements(data);
  }, [filterObject, data]);

  return {
    elements,
    totalElements: data.length,
  };
}

export default useFilteredObjects;
