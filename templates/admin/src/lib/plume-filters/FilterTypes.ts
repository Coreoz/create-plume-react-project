import { CheckboxProps, InputProps, RadioProps } from '@mui/material';

export type FilterValue = string | string[] | boolean;

export type FilterMenuProps = {
  title: string,
  onResetFilters: () => void,
};

export type FilterContainerProps = {
  messageKey: string,
  info?: string,
};

export type FilterProps = {
  value: string,
  disabled?: boolean,
};

export type SearchBarFilterProps = FilterProps & {
  onChange: (value: string) => void,
  onClear?: () => void,
  InputProps?: InputProps,
};


export type CheckboxFilterProps = FilterProps & {
  label: string,
  selected: boolean,
  onValueClicked: (check: boolean) => void,
  CheckboxProps?: CheckboxProps,
};

export type RadioFilterProps = FilterProps & {
  label: string,
  selected: boolean,
  onValueClicked: (check: boolean) => void,
  RadioProps?: RadioProps,
};

export type FilterGroupOption = Omit<CheckboxFilterProps | RadioFilterProps, 'selected' | 'onValueClicked'>;

export type FilterGroupProps = FilterContainerProps & {
  onChange: (value: string[]) => void,
  possibleValues: FilterGroupOption[],
  selectedValues: string[] | undefined,
  type: 'multiple' | 'single',
  disabled?: boolean,
};
