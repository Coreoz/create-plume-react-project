import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import PageTitle from './layout/PageTitle';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import { Panel, PanelSeparator } from './layout/Panel';
import FormField from './form/FormField';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';
import InputText from './form/fields/InputText';
import InputSelect from './form/fields/InputSelect';
import ListElements from './layout/ListElements';
import StatusDot from './layout/StatusDot';
import ListSingleElement from './layout/ListSingleElement';
import ListHeader from './layout/ListHeader';
import { PageBloc, PageBlocColumn } from './layout/PageBloc';
import ListFilterMenu from './layout/ListFilterMenu';
import ListSortMenu from './layout/ListSortMenu';

export default class AdminTheme implements PlumeAdminTheme {
  pageTitle = PageTitle;

  pageBloc = PageBloc;

  pageBlocColumn = PageBlocColumn;

  actionsContainer = ActionsContainer;

  actionButton = ActionButton;

  actionLink = ActionLink;

  panel = Panel;

  panelSeparator = PanelSeparator;

  listHeader = ListHeader;

  listSortMenu = ListSortMenu;

  listFilterMenu = ListFilterMenu;

  listElements = ListElements;

  listSingleElement = ListSingleElement;

  statusDot = StatusDot;

  popin = Popin;

  popinCloseWithoutSaving = PopinCloseWithoutSaving;

  formField = FormField;

  inputText = InputText;

  inputSelect = InputSelect;
}
