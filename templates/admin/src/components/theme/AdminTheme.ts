import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import { ActionButton, ActionLink, ActionsContainer } from './action/Actions';
import InputSelect from './form/fields/InputSelect';
import InputText from './form/fields/InputText';
import FormField from './form/FormField';
import { PageBloc, PageBlocColumn } from './layout/PageBloc';
import PageTitle from './layout/PageTitle';
import { Panel, PanelSeparator } from './layout/Panel';
import StatusDot from './layout/StatusDot';
import { ListElements, ListSingleElement } from './list/ListElements';
import ListFilters, { ListObjectFilters } from './list/ListFilters';
import ListHeader from './list/ListHeader';
import ListSearchBar from './list/ListSearchBar';
import ListSortMenu from './list/ListSortMenu';
import { Popin, PopinCloseWithoutSaving } from './popin/Popin';

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

  listFilters = ListFilters;

  listObjectFilters = ListObjectFilters;

  listElements = ListElements;

  listSingleElement = ListSingleElement;

  statusDot = StatusDot;

  popin = Popin;

  popinCloseWithoutSaving = PopinCloseWithoutSaving;

  formField = FormField;

  inputText = InputText;

  inputSelect = InputSelect;
}
