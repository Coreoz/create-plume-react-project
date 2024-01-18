import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '../../lib/plume-admin-theme/action/ActionProps';
import {
  FormFieldProps,
} from '../../lib/plume-admin-theme/form/FormFieldProps';
import {
  InputSelectProps,
  InputTextProps,
} from '../../lib/plume-admin-theme/form/FormInputProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelTitleProps,
  PanelProps,
  StatusDotProps,
} from '../../lib/plume-admin-theme/layout/LayoutProps';
import {
  FilterMenuProps,
} from '../../lib/plume-admin-theme/table/filter/FilterProps';
import {
  ListElementsProps,
  ListHeaderProps,
  ListSingleElementProps,
} from '../../lib/plume-admin-theme/table/ListProps';
import {
  SearchBarProps,
} from '../../lib/plume-admin-theme/table/search/SearchProps';
import { SortMenuProps } from '../../lib/plume-admin-theme/table/sort/SortProps';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import {
  PopinCloseWithoutSavingProps,
  PopinProps,
} from '../../lib/plume-admin-theme/popin/PopinProps';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import InputSelect from './form/fields/InputSelect';
import InputText from './form/fields/InputText';
import FormField from './form/FormField';
import {
  Panel,
  PanelContent,
  PanelSeparator,
  PanelTitle,
  PanelContentElement,
  PanelContentElementColumn,
} from './layout/Panel';
import StatusDot from './layout/StatusDot';
import MultipleChoiceFilterMenu from './table/filter/MultipleChoiceFilterMenu';
import { ListElements, ListSingleElement } from './table/ListElements';
import ListHeader from './table/ListHeader';
import SearchBar from './table/search/SearchBar';
import SortMenu from './table/sort/SortMenu';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';

export default class AdminTheme implements PlumeAdminTheme {
  actionsContainer: (props: ActionContainerProps) => JSX.Element = ActionsContainer;

  actionButton: (props: ActionButtonProps) => JSX.Element = ActionButton;

  actionLink: (props: ActionLinkProps) => JSX.Element = ActionLink;

  panel: (props: PanelProps) => JSX.Element = Panel;

  panelSeparator: () => JSX.Element = PanelSeparator;

  panelTitle: (props: PanelTitleProps) => JSX.Element = PanelTitle;

  panelContent: (props: PanelProps) => JSX.Element = PanelContent;

  panelContentElement: (props: PanelContentElementProps) => JSX.Element = PanelContentElement;

  panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element = PanelContentElementColumn;

  searchBar: (props: SearchBarProps) => JSX.Element = SearchBar;

  sortMenu: (props: SortMenuProps) => JSX.Element = SortMenu;

  multipleChoiceFilterMenu: (props: FilterMenuProps) => JSX.Element = MultipleChoiceFilterMenu;

  listHeader: (props: ListHeaderProps) => JSX.Element = ListHeader;

  listElements: (props: ListElementsProps) => JSX.Element = ListElements;

  listSingleElement: (props: ListSingleElementProps) => JSX.Element = ListSingleElement;

  statusDot: (props: StatusDotProps) => JSX.Element = StatusDot;

  popin: (props: PopinProps) => JSX.Element = Popin;

  popinCloseWithoutSaving: (props: PopinCloseWithoutSavingProps) => JSX.Element | null = PopinCloseWithoutSaving;

  formField: (props: FormFieldProps) => JSX.Element = FormField;

  inputText: (props: InputTextProps) => JSX.Element = InputText;

  inputSelect: (props: InputSelectProps) => JSX.Element = InputSelect;
}
