export type SortElementProps = {
  sortKey: string,
  sortFunction: (a: any, b: any) => number
}

export type ListSearchBarProps = {
  onSearch: (event: any) => void,
  placeHolder?: string,
  children?: React.ReactNode,
}

export type ListElementsProps = {
  children?: React.ReactNode,
  listLength: number,
  isLoading?: boolean,
  label?: string,
  icon?: boolean,
};

export type ListSingleElementProps = {
  children: React.ReactNode,
  onSelectElement?: () => void,
  cssClasses?: string,
};

export type ListSortMenuProps = {
  sortedObjectKey: string,
  sortPossibilities: { [key: string]: SortElementProps },
  defaultSortPossibility: SortElementProps,
  onSort: (sortElement: SortElementProps) => void,
}

export type FilterElementProps<T> = {
  filterKey: string,
  keyExtractor: (a: T) => string,
}

export type ListFilterMenuProps<T> = {
  filteredObjectKey: string,
  filterPossibilities: { [key: string]: FilterElementProps<T> },
  onFilter: (filterElement: FilterElementProps<T>, newValue: string, isChecked: boolean) => void,
  activeFilters: Map<string, string[]>,
  rawList: T[] | undefined,
}

export type ListHeaderProps = {
  listLength: number,
  sortConfiguration?: ListSortMenuProps,
}
