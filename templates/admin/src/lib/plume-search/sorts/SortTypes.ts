export type SortOption<S extends string> = {
  id: S,
  desc: boolean,
};

export type SearchSortType<S extends string> = {
  sortOptions: SortOption<S>[],
  currentSort: SortOption<S>,
  updateSort: (sortOption: SortOption<S>) => void,
};

export type SortSelectProps<S extends string> = {
  messageKey: string,
  sortPossibilities: SortOption<S>[],
  sort: SortOption<S>,
  onSort: (sortElement: SortOption<S>) => void,
};
