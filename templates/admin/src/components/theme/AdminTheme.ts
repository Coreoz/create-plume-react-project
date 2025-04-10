import Filter from '@components/theme/filter/Filter';
import FilterGroup from '@components/theme/filter/FilterGroup';
import FilterMenu from '@components/theme/filter/FilterMenu';
import FilterInputSearch from '@components/theme/filter/inputsearch/FilterInputSearch';
import InputPassword from '@components/theme/form/fields/InputPassword';
import List from '@components/theme/list/List';
import ListHead from '@components/theme/list/ListHead';
import ListItem from '@components/theme/list/ListItem';
import ConfirmationPopIn from '@components/theme/popin/ConfirmationPopIn';
import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '@lib/plume-admin-theme/action/ActionProps';
import { FormFieldProps } from '@lib/plume-admin-theme/form/FormFieldProps';
import {
  InputPasswordProps,
  InputSelectProps,
  InputTextProps,
} from '@lib/plume-admin-theme/form/FormInputProps';
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
import { ReactNode } from 'react';
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

  actionsContainer: (props: ActionContainerProps) => ReactNode = ActionsContainer;

  actionButton: (props: ActionButtonProps) => ReactNode = ActionButton;

  actionLink: (props: ActionLinkProps<T>) => ReactNode = ActionLink;

  // layout

  panel: (props: PanelProps) => ReactNode = Panel;

  panelSeparator: () => ReactNode = PanelSeparator;

  panelTitle: (props: PanelTitleProps<T>) => ReactNode = PanelTitle;

  panelContent: (props: PanelProps) => ReactNode = PanelContent;

  panelContentElement: (props: PanelContentElementProps) => ReactNode = PanelContentElement;

  panelContentElementColumn: (props: PanelContentElementColumnProps) => ReactNode = PanelContentElementColumn;

  // lists

  listHead: (props: ListHeadProps) => ReactNode = ListHead;

  list: (props: ListProps) => ReactNode = List;

  listItem: (props: ListItemProps) => ReactNode = ListItem;

  // popin

  popin: (props: PopinProps) => ReactNode = Popin;

  confirmationPopIn: (props: ConfirmationPopInProps) => ReactNode = ConfirmationPopIn;

  // form
  formContainer: <TFieldValues extends FieldValues = FieldValues>(
    props: FormContainerProps<TFieldValues>,
  ) => ReactNode = FormContainer;

  formField: (props: FormFieldProps) => ReactNode = FormField;

  inputText: (props: InputTextProps) => ReactNode = InputText;

  inputSelect: (props: InputSelectProps) => ReactNode = InputSelect;

  inputPassword: (props: InputPasswordProps) => ReactNode = InputPassword;

  // filters

  filterMenu: (props: FilterMenuProps) => ReactNode = FilterMenu;

  filter: (props: FilterContainerProps) => ReactNode = Filter;

  filterGroup: (props: FilterGroupProps) => ReactNode = FilterGroup;

  filterInputSearch: (props: FilterInputSearchProps) => ReactNode = FilterInputSearch;

  // sort

  sortSelect: <S extends string>(props: SortSelectProps<S>) => ReactNode = SortSelect;
}
