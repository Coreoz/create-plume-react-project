import { FormContainerProps } from '@lib/plume-admin-theme/form/FormProps';
import { ListHeadProps, ListItemProps, ListProps } from '@lib/plume-admin-theme/list/ListProps';
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
import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputPasswordProps, InputSelectProps, InputTextProps } from './form/FormInputProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from './panel/PanelProps';
import { ConfirmationPopInProps, PopinProps } from './popin/PopinProps';

export default abstract class PlumeAdminTheme<T extends { link: Link }> {
  // layout

  abstract panel: (props: PanelProps) => ReactNode;

  abstract panelSeparator: () => ReactNode;

  abstract panelTitle: (props: PanelTitleProps<T>) => ReactNode;

  abstract panelContent: (props: PanelProps) => ReactNode;

  abstract panelContentElement: (props: PanelContentElementProps) => ReactNode;

  abstract panelContentElementColumn: (props: PanelContentElementColumnProps) => ReactNode;

  // lists

  abstract listHead: (props: ListHeadProps) => ReactNode;

  abstract list: (props: ListProps) => ReactNode;

  abstract listItem: (props: ListItemProps) => ReactNode;

  // actions
  abstract actionsContainer: (props: ActionContainerProps) => ReactNode;

  abstract actionLink: (props: ActionLinkProps<T>) => ReactNode;

  abstract actionButton: (props: ActionButtonProps) => ReactNode;

  // popin
  abstract popin: (props: PopinProps) => ReactNode;

  abstract confirmationPopIn: (props: ConfirmationPopInProps) => ReactNode;

  // form

  abstract formContainer: <TFieldValues extends FieldValues = FieldValues>(
    props: FormContainerProps<TFieldValues>,
  ) => ReactNode;

  // form fields

  abstract formField: (props: FormFieldProps) => ReactNode;

  abstract inputText: (props: InputTextProps) => ReactNode;

  abstract inputSelect: (props: InputSelectProps) => ReactNode;

  abstract inputPassword: (props: InputPasswordProps) => ReactNode;

  // filters

  abstract filterMenu: (props: FilterMenuProps) => ReactNode;

  abstract filter: (props: FilterContainerProps) => ReactNode;

  abstract filterGroup: (props: FilterGroupProps) => ReactNode;

  abstract filterInputSearch: (props: FilterInputSearchProps) => ReactNode;

  // sort

  abstract sortSelect: <S extends string>(props: SortSelectProps<S>) => ReactNode;
}
