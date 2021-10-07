import { LayoutPageTitleProps, PanelProps } from './layout/LayoutProps';
import { ActionButtonProps, ActionContainerProps, ActionLinkProps } from './action/ActionProps';
import { PopinCloseWithoutSavingProps, PopinProps } from './popin/PopinProps';
import { FormFieldProps } from './form/FormFieldProps';
import { InputSelectProps, InputTextProps } from './form/FormInputProps';

export default abstract class PlumeAdminTheme {
  // layout
  abstract pageTitle: (props: LayoutPageTitleProps) => JSX.Element;

  abstract panel: (props: PanelProps) => JSX.Element;

  abstract panelSeparator: () => JSX.Element;

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
