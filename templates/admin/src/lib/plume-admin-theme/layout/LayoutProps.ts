import { IconType } from '../../../components/theme/IconType';
import Status from './Status';
import { ColumnType } from '../../../components/theme/ColumnType';

export type LayoutPageTitleProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type LayoutPageBlocProps = {
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type LayoutPageBlocColumnProps = {
  column: ColumnType;
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type PanelProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type ListElementsProps = {
  children: React.ReactNode;
  listLength: number;
  isLoading?: boolean;
  label?: string;
  icon?: boolean
};

export type ListSingleElementProps = {
  children: React.ReactNode,
  onSelectElement?: () => void,
  cssClasses: string,
};

export type StatusDotProps = {
  status: Status,
}

export type SortElementProps = {
  sortKey: string,
  sortFunction: (a: any, b: any) => number
}

export type ListSortMenuProps = {
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
  sortConfiguration: ListSortMenuProps,
}
