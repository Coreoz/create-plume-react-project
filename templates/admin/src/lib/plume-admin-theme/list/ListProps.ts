import { SortMenuProps } from './sort/SortProps';

export type ListElementsProps = {
  children?: React.ReactNode,
  listLength: number,
  isLoading?: boolean,
  label?: string,
  icon?: boolean,
};

export type ListSingleElementProps = {
  children: React.ReactNode,
  onSelectElement?: () => void,
  cssClasses?: string,
};

export type ListHeaderProps = {
  listLength: number,
  sortConfiguration?: SortMenuProps,
}
