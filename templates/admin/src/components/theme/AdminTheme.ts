import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '../../lib/plume-admin-theme/action/ActionProps';
import { FormFieldProps } from '../../lib/plume-admin-theme/form/FormFieldProps';
import { InputSelectProps, InputTextProps } from '../../lib/plume-admin-theme/form/FormInputProps';
import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from '../../lib/plume-admin-theme/layout/LayoutProps';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import { PopinCloseWithoutSavingProps, PopinProps } from '../../lib/plume-admin-theme/popin/PopinProps';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import InputSelect from './form/fields/InputSelect';
import InputText from './form/fields/InputText';
import FormField from './form/FormField';
import {
  Panel,
  PanelContent, PanelContentElement, PanelContentElementColumn,
  PanelSeparator,
  PanelTitle,
} from './layout/Panel';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';

export default class AdminTheme implements PlumeAdminTheme {
  // actions

  actionsContainer: (props: ActionContainerProps) => JSX.Element = ActionsContainer;

  actionButton: (props: ActionButtonProps) => JSX.Element = ActionButton;

  actionLink: (props: ActionLinkProps) => JSX.Element = ActionLink;

  // layout

  panel: (props: PanelProps) => JSX.Element = Panel;

  panelSeparator: () => JSX.Element = PanelSeparator;

  panelTitle: (props: PanelTitleProps) => JSX.Element = PanelTitle;

  panelContent: (props: PanelProps) => JSX.Element = PanelContent;

  panelContentElement: (props: PanelContentElementProps) => JSX.Element = PanelContentElement;

  panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element = PanelContentElementColumn;

  // popin

  popin: (props: PopinProps) => JSX.Element = Popin;

  popinCloseWithoutSaving: (props: PopinCloseWithoutSavingProps) => JSX.Element | null = PopinCloseWithoutSaving;

  formField: (props: FormFieldProps) => JSX.Element = FormField;

  inputText: (props: InputTextProps) => JSX.Element = InputText;

  inputSelect: (props: InputSelectProps) => JSX.Element = InputSelect;
}
