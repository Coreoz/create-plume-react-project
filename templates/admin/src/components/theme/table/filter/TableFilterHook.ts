import { ColumnFilter, Header, HeaderGroup } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  FilterMenuProps,
  FilterProps,
} from '../../../../lib/plume-admin-theme/table/filter/FilterProps';

/**
 * Hook to handle react-table filtering easily
 * @param messageKey the unique filter group name
 * @param tableHeaderGroups the HeaderGroup object given by the react-table library
 * @param selectedValues the current selected values
 * @param onFilterValueClicked callback executed when clicking on a checkbox
 */
export default function useTableFilter<T>(
  messageKey: string,
  tableHeaderGroups: HeaderGroup<T>[],
  selectedValues: ColumnFilter[],
  onFilterValueClicked: (to: ColumnFilter[]) => void,
): FilterMenuProps {
  const filters: FilterProps[] = useMemo(
    () => tableHeaderGroups
      .flatMap((headerGroup: HeaderGroup<T>) => headerGroup.headers
        .filter((header: Header<T, unknown>) => header.column.getCanFilter())
        .map((header: Header<T, unknown>) => ({
          filterKey: header.column.id,
          possibleValues: Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
        }))),
    [tableHeaderGroups],
  );

  return {
    messageKey,
    filters,
    selectedValues,
    onFilterValueClicked,
  };
}
