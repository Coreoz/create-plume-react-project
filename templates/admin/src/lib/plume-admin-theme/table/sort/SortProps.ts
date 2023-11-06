import { ColumnSort } from '@tanstack/react-table';

export type SortMenuProps = {
  messageKey: string,
  sortPossibilities: string[],
  currentSort: ColumnSort,
  onSort: (sortElement: ColumnSort) => void,
};
