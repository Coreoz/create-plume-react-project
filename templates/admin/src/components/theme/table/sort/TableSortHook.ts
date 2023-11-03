import { ColumnSort, Header, HeaderGroup } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  SortMenuProps,
} from '../../../../lib/plume-admin-theme/table/sort/SortProps';

/**
 * Hook to handle react-table sorting easily
 * By default, all table columns are sortable, just set enableColumnFilter to false for a column to remove it
 * from the sort menu
 * @param sortGroupName the unique filter group name, referenced in the {@link Translations}
 * @param tableHeaderGroups the HeaderGroup object given by the react-table library
 * @param currentSort the current sort. Should also be used as default sort
 * @param onSort callback executed when clicking on a menu entry
 */
export default function useTableSorting<T>(
  sortGroupName: string,
  tableHeaderGroups: HeaderGroup<T>[],
  currentSort: ColumnSort,
  onSort: (to: ColumnSort[]) => void,
): SortMenuProps {

  const sortPossibilities = useMemo(() => tableHeaderGroups
    .flatMap((header: HeaderGroup<T>) => header.headers
      .filter((col: Header<T, unknown>) => col.column.getCanSort())
      .map((col: Header<T, unknown>) => col.column.id),
    ), [tableHeaderGroups]);

  return {
    sortedObjectKey: sortGroupName,
    sortPossibilities,
    currentSort,
    onSort: (to: ColumnSort) => onSort([to]),
  };
}
