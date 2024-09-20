import { FilterValue } from '@lib/plume-search/filters/FilterTypes';
import { useState } from 'react';

export type SearchFilters<T> = {
  filterValues: Partial<T>,
  setFilterValue: (field: keyof T, value: FilterValue) => void,
  resetFilters: () => void,
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
function useSearchFilters<T>(initialState: Partial<T> = {}): SearchFilters<T> {
  const [filterValues, setFilterValues] = useState<Partial<T>>(initialState);

  const setFilterValue = (field: keyof T, value: FilterValue) => {
    setFilterValues((previousState: Partial<T>): Partial<T> => ({
      ...previousState,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilterValues(initialState);
  };

  const reloadSearch = () => {
    setFilterValues({ ...filterValues });
  };

  return {
    filterValues,
    resetFilters,
    setFilterValue,
    reloadSearch,
  };
}

export default useSearchFilters;
