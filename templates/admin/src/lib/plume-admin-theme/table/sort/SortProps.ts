import { ColumnSort } from '@tanstack/react-table';

export type SortMenuProps = {
  sortedObjectKey: string,
  sortPossibilities: string[],
  currentSort: ColumnSort,
  onSort: (sortElement: ColumnSort) => void,
};
