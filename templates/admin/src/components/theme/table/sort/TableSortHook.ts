import { ColumnSort, Header, HeaderGroup } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/table/sort/SortProps';

/**
 * Hook to handle react-table sorting easily
 * By default, all table columns are sortable, just set enableColumnFilter to false for a column to remove it
 * from the sort menu
 * @param messageKey the unique filter group name, referenced in the {@link Translations}
 * @param tableHeaderGroups the HeaderGroup object given by the react-table library
 * @param defaultSort the default sort.
 * @param onSort callback executed when clicking on a menu entry
 */
export default function useTableSorting<T>(
  messageKey: string,
  tableHeaderGroups: HeaderGroup<T>[],
  defaultSort: ColumnSort,
  onSort: (to: ColumnSort[]) => void,
): SortMenuProps {
  const sortPossibilities: string[] = useMemo(() => tableHeaderGroups
    .flatMap((headers: HeaderGroup<T>) => headers.headers
      .filter((headerItem: Header<T, unknown>) => headerItem.column.getCanSort())
      .map((headerItem: Header<T, unknown>) => headerItem.column.id),
    ), [tableHeaderGroups]);

  return {
    messageKey,
    sortPossibilities,
    defaultSort,
    onSort: (to: ColumnSort) => onSort([to]),
  };
}
