import { ColumnFilter } from "@tanstack/react-table";

export type FilterProps = {
  filterKey: string,
  possibleValues: string[],
};

export type FilterMenuProps = {
  filterMenuKey: string,
  onFilterValueClicked: (filters: ColumnFilter[]) => void,
  selectedValues: ColumnFilter[],
  filters: FilterProps[],
};

