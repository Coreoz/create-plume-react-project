import { FilterValue } from '@lib/plume-filters/FilterTypes';
import { useState } from 'react';

export type UseSearchFilterHook<T> = {
  searchObject: Partial<T>,
  updateSearchField: (field: keyof T, value: FilterValue) => void,
  onReset: () => void,
  reloadSearch: () => void,
};

function useSearchFilter<T>(initialState: Partial<T> = {}): UseSearchFilterHook<T> {
  const [searchObject, setSearchObject] = useState<Partial<T>>(initialState);

  const onChangeSearchObject = (field: keyof T, value: FilterValue) => {
    setSearchObject((previousState: Partial<T>): Partial<T> => ({ ...previousState, [field]: value }));
  };

  const onReset = () => {
    setSearchObject(initialState);
  };

  const reloadSearch = () => {
    setSearchObject({ ...searchObject });
  };

  return {
    searchObject,
    onReset,
    updateSearchField: onChangeSearchObject,
    reloadSearch,
  };
}

export default useSearchFilter;
