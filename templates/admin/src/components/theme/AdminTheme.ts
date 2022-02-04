import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import PageTitle from './layout/PageTitle';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import { Panel, PanelSeparator } from './layout/Panel';
import FormField from './form/FormField';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';
import InputText from './form/fields/InputText';
import InputSelect from './form/fields/InputSelect';
import { ListElements, ListSingleElement } from './list/ListElements';
import StatusDot from './layout/StatusDot';
import ListHeader from './list/ListHeader';
import { PageBloc, PageBlocColumn } from './layout/PageBloc';
import ListFilterMenu from './list/ListFilterMenu';
import ListSortMenu from './list/ListSortMenu';
import ListSearchBar from './list/ListSearchBar';

export default class AdminTheme implements PlumeAdminTheme {
  pageTitle = PageTitle;

  pageBloc = PageBloc;

  pageBlocColumn = PageBlocColumn;

  actionsContainer = ActionsContainer;

  actionButton = ActionButton;

  actionLink = ActionLink;

  panel = Panel;

  panelSeparator = PanelSeparator;

  listSearchBar = ListSearchBar;

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
