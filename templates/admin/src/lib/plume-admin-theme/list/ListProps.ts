import { Table } from '@tanstack/react-table';

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

export type ListHeaderTableSorting<T> = {
  sortedObjectKey: string,
  defaultSortKey: string,
  table: Table<T>
};

export type ListHeaderProps<T> = {
  listTitle?: string,
  tableSorting?: ListHeaderTableSorting<T>
};
