import { ColumnFiltersState, Table } from '@tanstack/react-table';

type FilterMenuProps = {
  filterObjectKey: string,
  filterMenuKey: string,
};

export interface MultipleChoiceFilterMenuProps extends FilterMenuProps {
  onFilterValueClicked: (filterKey: string, valueSelected: string, isChecked: boolean) => void,
  selectedValues: string[],
}

export interface MultipleChoiceRawFilterMenuProps extends MultipleChoiceFilterMenuProps {
  possibleValues: string[]
}

export interface MultipleChoiceObjectFilterMenuProps<T> {
  table: Table<T>,
  columnFilters: ColumnFiltersState,
  filterObjectKey: string,
}
