import Filter from '@components/theme/filter/Filter';
import FilterGroup from '@components/theme/filter/FilterGroup';
import FilterMenu from '@components/theme/filter/FilterMenu';
import FilterInputSearch from '@components/theme/filter/inputsearch/FilterInputSearch';
import InputPassword from '@components/theme/form/fields/InputPassword';
import List from '@components/theme/list/List';
import ListHead from '@components/theme/list/ListHead';
import ListItem from '@components/theme/list/ListItem';
import ConfirmationPopIn from '@components/theme/popin/ConfirmationPopIn';
import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from '@lib/plume-admin-theme/action/ActionProps';
import { FormFieldProps } from '@lib/plume-admin-theme/form/FormFieldProps';
import { InputPasswordProps, InputSelectProps, InputTextProps } from '@lib/plume-admin-theme/form/FormInputProps';
import { FormContainerProps } from '@lib/plume-admin-theme/form/FormProps';
import { ListHeadProps, ListItemProps, ListProps } from '@lib/plume-admin-theme/list/ListProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from '@lib/plume-admin-theme/panel/PanelProps';
import PlumeAdminTheme from '@lib/plume-admin-theme/PlumeAdminTheme';
import { ConfirmationPopInProps, PopinProps } from '@lib/plume-admin-theme/popin/PopinProps';
import {
  FilterContainerProps,
  FilterGroupProps,
  FilterInputSearchProps,
  FilterMenuProps,
} from '@lib/plume-search/filters/FilterTypes';
import { SortSelectProps } from '@lib/plume-search/sorts/SortTypes';
import { FieldValues } from 'react-hook-form';
import { Link } from 'type-route';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import FormField from './form/fields/FormField';
import InputSelect from './form/fields/InputSelect';
import InputText from './form/fields/InputText';
import FormContainer from './form/FormContainer';
import {
  Panel,
  PanelContent,
  PanelContentElement,
  PanelContentElementColumn,
  PanelSeparator,
  PanelTitle,
} from './panel/Panel';
import Popin from './popin/Popin';
import SortSelect from './sort/SortSelect';

export default class AdminTheme<T extends { link: Link }> implements PlumeAdminTheme<T> {
  // actions

  actionsContainer: (props: ActionContainerProps) => JSX.Element = ActionsContainer;

  actionButton: (props: ActionButtonProps) => JSX.Element = ActionButton;

  actionLink: (props: ActionLinkProps<T>) => JSX.Element = ActionLink;

  // layout

  panel: (props: PanelProps) => JSX.Element = Panel;

  panelSeparator: () => JSX.Element = PanelSeparator;

  panelTitle: (props: PanelTitleProps<T>) => JSX.Element = PanelTitle;

  panelContent: (props: PanelProps) => JSX.Element = PanelContent;

  panelContentElement: (props: PanelContentElementProps) => JSX.Element = PanelContentElement;

  panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element = PanelContentElementColumn;

  // lists

  listHead: (props: ListHeadProps) => JSX.Element = ListHead;

  list: (props: ListProps) => JSX.Element = List;

  listItem: (props: ListItemProps) => JSX.Element = ListItem;

  // popin

  popin: (props: PopinProps) => JSX.Element = Popin;

  confirmationPopIn: (props: ConfirmationPopInProps) => JSX.Element = ConfirmationPopIn;

  // form
  formContainer: <TFieldValues extends FieldValues = FieldValues>(
    props: FormContainerProps<TFieldValues>,
  ) => JSX.Element = FormContainer;

  formField: (props: FormFieldProps) => JSX.Element = FormField;

  inputText: (props: InputTextProps) => JSX.Element = InputText;

  inputSelect: (props: InputSelectProps) => JSX.Element = InputSelect;

  inputPassword: (props: InputPasswordProps) => JSX.Element = InputPassword;

  // filters

  filterMenu: (props: FilterMenuProps) => JSX.Element = FilterMenu;

  filter: (props: FilterContainerProps) => JSX.Element = Filter;

  filterGroup: (props: FilterGroupProps) => JSX.Element = FilterGroup;

  filterInputSearch: (props: FilterInputSearchProps) => JSX.Element = FilterInputSearch;

  // sort

  sortSelect: <S extends string>(props: SortSelectProps<S>) => JSX.Element = SortSelect;
}
