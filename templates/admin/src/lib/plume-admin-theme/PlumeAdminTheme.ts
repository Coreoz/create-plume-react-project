import { ListHeadProps, ListItemProps, ListProps } from '@lib/plume-admin-theme/list/ListProps';
import {
  FilterContainerProps, FilterGroupProps, FilterInputSearchProps, FilterMenuProps,
} from '@lib/plume-search/filters/FilterTypes';
import { SortSelectProps } from '@lib/plume-search/sorts/SortTypes';
import { FieldValues } from 'react-hook-form';
import { PropsWithChildren } from 'react';
import { FormContainerProps } from '@lib/plume-admin-theme/form/FormProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from './layout/LayoutProps';
import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import {
  ConfirmationPopInProps,
  PopinProps,
} from './popin/PopinProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputPasswordProps, InputSelectProps, InputTextProps } from './form/FormInputProps';

export default abstract class PlumeAdminTheme {
  // layout

  abstract panel: (props: PropsWithChildren<PanelProps>) => JSX.Element;

  abstract panelSeparator: () => JSX.Element;

  abstract panelTitle: (props: PropsWithChildren<PanelTitleProps>) => JSX.Element;

  abstract panelContent: (props: PropsWithChildren<PanelProps>) => JSX.Element;

  abstract panelContentElement: (props: PropsWithChildren<PanelContentElementProps>) => JSX.Element;

  abstract panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element;

  // lists

  abstract listHead: (props: PropsWithChildren<ListHeadProps>) => JSX.Element;

  abstract list: (props: PropsWithChildren<ListProps>) => JSX.Element;

  abstract listItem: (props: PropsWithChildren<ListItemProps>) => JSX.Element;

  // actions
  abstract actionsContainer: (props: ActionContainerProps) => JSX.Element;

  abstract actionLink: (props: ActionLinkProps) => JSX.Element;

  abstract actionButton: (props: ActionButtonProps) => JSX.Element;

  // popin
  abstract popin: (props: PopinProps) => JSX.Element;

  abstract confirmationPopIn: (props: ConfirmationPopInProps) => JSX.Element | null;

  // form

  abstract formContainer: <TFieldValues extends FieldValues = FieldValues>(
    props: PropsWithChildren<FormContainerProps<TFieldValues>>,
  ) => JSX.Element;

  // form fields

  abstract formField: (props: FormFieldProps) => JSX.Element;

  abstract inputText: (props: InputTextProps) => JSX.Element;

  abstract inputSelect: (props: InputSelectProps) => JSX.Element;

  abstract inputPassword: (props: InputPasswordProps) => JSX.Element;

  // filters

  abstract filterMenu: (props: PropsWithChildren<FilterMenuProps>) => JSX.Element;

  abstract filter: (props: PropsWithChildren<FilterContainerProps>) => JSX.Element;

  abstract filterGroup: (props: FilterGroupProps) => JSX.Element;

  abstract filterInputSearch: (props: PropsWithChildren<FilterInputSearchProps>) => JSX.Element;

  // sort

  abstract sortSelect: <S extends string>(props: SortSelectProps<S>) => JSX.Element;
}
