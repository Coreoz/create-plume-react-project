import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputSelectProps, InputTextProps } from './form/FormInputProps';
import {
  LayoutPageBlocColumnProps,
  LayoutPageBlocProps,
  LayoutPageTitleProps,
  PanelProps,
  StatusDotProps,
} from './layout/LayoutProps';

import {
  ListElementsProps,
  ListHeaderProps,
  ListSingleElementProps,
} from './list/ListProps';
import { SearchBarProps } from './list/search/SearchProps';
import { PopinCloseWithoutSavingProps, PopinProps } from './popin/PopinProps';
import { SortListProps } from './list/sort/SortProps';
import { MultipleChoiceRawFilterMenuProps } from './list/filter/FilterProps';

export default abstract class PlumeAdminTheme {
  // layout
  abstract pageTitle: (props: LayoutPageTitleProps) => JSX.Element;

  abstract pageBloc: (props: LayoutPageBlocProps) => JSX.Element;

  abstract pageBlocColumn: (props: LayoutPageBlocColumnProps) => JSX.Element;

  abstract panel: (props: PanelProps) => JSX.Element;

  abstract panelSeparator: () => JSX.Element;

  abstract searchBar: (props: SearchBarProps) => JSX.Element;

  abstract sortMenu: <T>(props: SortListProps<T>) => JSX.Element;

  abstract multipleChoiceFilterMenu: (props: MultipleChoiceRawFilterMenuProps) => JSX.Element;

  abstract listHeader: <T>(props: ListHeaderProps<T>) => JSX.Element;

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
