import { useMemo, useState } from 'react';
import { SearchSortType, SortOption } from './SortTypes';

type SearchSortHookProps<S extends string> = {
  sortOptionKeys: S[],
  defaultSortOption?: SortOption<S>,
};

/**
 * Hook to handle sort options
 * The return object can be used in component like {@link SortSelect}
 * Each option key is duplicated in ascendant and descendant option
 *
 * @param sortOptionKeys the sort options key, they must be declared in an Enum object
 * @param defaultSortOption the default sort option, if none provided, the first of the sortOptionKeys
 * @return sortOptions the sort options keys duplicated
 * @return currentSort the current sort
 * @return updateSort function to update the current sort
 */
function useSearchSort<S extends string>({
  sortOptionKeys,
  defaultSortOption,
}: SearchSortHookProps<S>): SearchSortType<S> {
  const sortOptions: SortOption<S>[] = useMemo(() => (
    sortOptionKeys.flatMap((sortElement: S) => [
      {
        id: sortElement,
        desc: false,
      },
      {
        id: sortElement,
        desc: true,
      },
    ])
  ), [sortOptionKeys]);

  const [currentSortOption, setCurrentSortOption] = useState<SortOption<S>>(
    defaultSortOption ?? sortOptions[0],
  );

  return {
    sortOptions,
    sort: currentSortOption,
    onSort: (sortOption: SortOption<S>) => setCurrentSortOption(sortOption),
  };
}

export default useSearchSort;
