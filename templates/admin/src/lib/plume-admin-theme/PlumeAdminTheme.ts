import {
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from './layout/LayoutProps';
import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import { PopinCloseWithoutSavingProps, PopinProps } from './popin/PopinProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputSelectProps, InputTextProps } from './form/FormInputProps';

export default abstract class PlumeAdminTheme {
  // layout

  abstract panel: (props: PanelProps) => JSX.Element;

  abstract panelSeparator: () => JSX.Element;

  abstract panelTitle: (props: PanelTitleProps) => JSX.Element;

  abstract panelContent: (props: PanelProps) => JSX.Element;

  abstract panelContentElement: (props: PanelContentElementProps) => JSX.Element;

  abstract panelContentElementColumn: (props: PanelContentElementColumnProps) => JSX.Element;

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
