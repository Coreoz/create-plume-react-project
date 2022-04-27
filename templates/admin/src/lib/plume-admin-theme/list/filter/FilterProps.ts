export type FilterProps = {
  filterKey: string,
}

export interface ObjectFilterProps<T> extends FilterProps {
  keyExtractor: (a: T) => string,
}

export interface RawFilterProps extends FilterProps {
  possibleValues: string[],
}

type FilterMenuProps = {
  filterMenuKey: string,
}

export interface MultipleChoiceFilterMenuProps extends FilterMenuProps {
  onFilterValueClicked: (filterKey: string, valueSelected: string, isChecked: boolean) => void,
  selectedValues: Map<string, string[]>,
}

export interface MultipleChoiceRawFilterMenuProps extends MultipleChoiceFilterMenuProps {
  filters: RawFilterProps[],
}

export interface MultipleChoiceObjectFilterMenuProps<T> extends MultipleChoiceFilterMenuProps {
  filters: ObjectFilterProps<T>[],
  rawList: T[],
}