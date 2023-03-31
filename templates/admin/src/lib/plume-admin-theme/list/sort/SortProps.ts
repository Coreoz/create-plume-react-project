import { Table } from '@tanstack/react-table';

export type SortListProps<T> = {
  sortedObjectKey: string,
  defaultSortKey: string
  table: Table<T>
};
