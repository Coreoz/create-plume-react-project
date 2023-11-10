import { ColumnSort } from '@tanstack/react-table';

export type SortMenuProps = {
  messageKey: string,
  sortPossibilities: string[],
  defaultSort: ColumnSort,
  onSort: (sortElement: ColumnSort) => void,
};
