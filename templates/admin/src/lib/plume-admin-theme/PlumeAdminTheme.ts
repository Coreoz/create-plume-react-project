import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputSelectProps, InputTextProps } from './form/FormInputProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelTitleProps,
  PanelProps,
  StatusDotProps,
} from './layout/LayoutProps';
import {
  FilterMenuProps,
} from './table/filter/FilterProps';
import {
  ListElementsProps,
  ListHeaderProps,
  ListSingleElementProps,
} from './table/ListProps';
import { SortMenuProps } from './table/sort/SortProps';
import { SearchBarProps } from './table/search/SearchProps';
import { PopinCloseWithoutSavingProps, PopinProps } from './popin/PopinProps';

export default abstract class PlumeAdminTheme {
  // layout
  abstract panel: (props: PanelProps) => JSX.Element;

  abstract panelSeparator: () => JSX.Element;

  abstract panelTitle: (props: PanelTitleProps) => JSX.Element;

  abstract panelContent: (props: PanelProps) => JSX.Element;

  abstract panelContentElement: (props: PanelContentElementProps) => JSX.Element;

  abstract panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element;

  abstract searchBar: (props: SearchBarProps) => JSX.Element;

  abstract sortMenu: (props: SortMenuProps) => JSX.Element;

  abstract multipleChoiceFilterMenu: (props: FilterMenuProps) => JSX.Element;

  abstract listHeader: (props: ListHeaderProps) => JSX.Element;

  abstract listElements: (props: ListElementsProps) => JSX.Element;

  abstract listSingleElement: (props: ListSingleElementProps) => JSX.Element;

  abstract statusDot: (props: StatusDotProps) => JSX.Element;

  // actions
  abstract actionsContainer: (props: ActionContainerProps) => JSX.Element;

  abstract actionLink: (props: ActionLinkProps) => JSX.Element;

  abstract actionButton: (props: ActionButtonProps) => JSX.Element;

  // popin
  abstract popin: (props: PopinProps) => JSX.Element;

  abstract popinCloseWithoutSaving: (props: PopinCloseWithoutSavingProps) => JSX.Element | null;

  // form
  abstract formField: (props: FormFieldProps) => JSX.Element;

  // form fields
  abstract inputText: (props: InputTextProps) => JSX.Element;

  abstract inputSelect: (props: InputSelectProps) => JSX.Element;
}
