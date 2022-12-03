export type FilterProps = {
  filterKey: string,
};

export interface ObjectFilterProps<T> extends FilterProps {
  keyExtractor: (a: T) => string,
}

export interface RawFilterProps extends FilterProps {
  possibleValues: string[],
}

type FilterMenuProps = {
  filterMenuKey: string,
};

export interface MultipleChoiceFilterMenuProps extends FilterMenuProps {
  onFilterValueClicked: (filterKey: string, valueSelected: string, isChecked: boolean) => void,
  selectedValues: string[],
}

export interface MultipleChoiceRawFilterMenuProps extends MultipleChoiceFilterMenuProps {
  possibleValues: string[]
}

export interface MultipleChoiceObjectFilterMenuProps<T> extends MultipleChoiceFilterMenuProps {
  rawList: T[],
}
