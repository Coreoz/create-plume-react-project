import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import PageTitle from './layout/PageTitle';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import { Panel, PanelSeparator } from './layout/Panel';
import FormField from './form/FormField';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';
import InputText from './form/fields/InputText';
import InputSelect from './form/fields/InputSelect';

export default class AdminTheme implements PlumeAdminTheme {
  pageTitle = PageTitle;

  actionsContainer = ActionsContainer;

  actionButton = ActionButton;

  actionLink = ActionLink;

  panel = Panel;

  panelSeparator = PanelSeparator;

  popin = Popin;

  popinCloseWithoutSaving = PopinCloseWithoutSaving;

  formField = FormField;

  inputText = InputText;

  inputSelect = InputSelect;
}
