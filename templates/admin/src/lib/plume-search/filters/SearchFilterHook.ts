import { FilterValue } from '@lib/plume-search/filters/FilterTypes';
import { useState } from 'react';

export type UseSearchFilterHook<T> = {
  searchObject: Partial<T>,
  updateSearchField: (field: keyof T, value: FilterValue) => void,
  onReset: () => void,
  reloadSearch: () => void,
};

/**
 * Hook for handling search object
 * @param initialState the initial search
 * @return updateSearchField function to call to update the search object
 * @return searchObject the up-to-date search object
 * @return onReset reset the search objet to its initial state
 * @return reloadSearch to recreate the search object and, if the object is observed, trigger a potential reload
 */
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
