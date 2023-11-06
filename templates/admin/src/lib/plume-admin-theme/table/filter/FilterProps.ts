import { ColumnFilter } from "@tanstack/react-table";

export type FilterProps = {
  filterKey: string,
  possibleValues: string[],
};

export type FilterMenuProps = {
  messageKey: string,
  onFilterValueClicked: (filters: ColumnFilter[]) => void,
  selectedValues: ColumnFilter[],
  filters: FilterProps[],
};

