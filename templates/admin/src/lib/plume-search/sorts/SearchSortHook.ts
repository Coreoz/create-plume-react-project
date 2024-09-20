import { useMemo, useState } from 'react';
import { SearchSortType, SortOption } from './SortTypes';

type SearchSortHookProps<S extends string> = {
  sortOptionKeys: S[],
  defaultSortOption?: SortOption<S>,
};

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
    currentSort: currentSortOption,
    updateSort: (sortOption: SortOption<S>) => setCurrentSortOption(sortOption),
  };
}

export default useSearchSort;
