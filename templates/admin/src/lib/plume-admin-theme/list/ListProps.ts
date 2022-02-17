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

export type FilterProps = {
  filterKey: string,
}

export interface ObjectFilterProps<T> extends FilterProps {
  keyExtractor: (a: T) => string,
}

export interface RawFilterProps extends FilterProps {
  possibleValues: string[],
}

export type ListFiltersProps = {
  filterMenuKey: string,
  onFilterValueClicked: (filterKey: string, valueSelected: string, isChecked: boolean) => void,
  selectedValues: Map<string, string[]>,
}

export interface ListRawFiltersProps extends ListFiltersProps {
  filters: RawFilterProps[],
}

export interface ListObjectFiltersProps<T> extends ListFiltersProps {
  filters: ObjectFilterProps<T>[],
  rawList: T[],
}

export type ListHeaderProps = {
  listLength: number,
  sortConfiguration?: ListSortMenuProps,
}
