import React from 'react';
import { useObservable } from 'micro-observables';
import { Route, Switch } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import { ToastContainer } from 'react-toastify';
import Router from './layout/Router';
import Navigation from './navigation/Navigation';
import SessionService from '../services/session/SessionService';
import Header from './layout/Header';
import Login from './pages/login/Login';
import ConditionalRoute from './theme/routes/ConditionalRoute';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';
import NotificationRenderer from './theme/NotificationRenderer';
import LocaleService from '../i18n/locale/LocaleService';
import initializeLocalizedDate from '../i18n/messages/LocalizedDate';

const logger = new Logger('App');

export default class App {
  constructor(
    private readonly localeService: LocaleService,
    private readonly sessionService: SessionService,
    private readonly notificationRenderer: NotificationRenderer,
  ) {
    // dayjs
    initializeLocalizedDate(localeService);

    notificationRenderer.initialize();
  }

  render = () => {
    // we need to observe at the top level the current locale
    // to rerender the whole application if the current locale changes
    const currentLocale = useObservable(this.localeService.getCurrentLocale());
    const currentUser = useObservable(this.sessionService.getCurrentUser());

    logger.info('Render App');
    return (
      <GlobalErrorBoundary>
        <ToastContainer />
        <Switch>
          <Route exact path="/login">
            <div id="login-layout">
              <Header currentLocale={currentLocale} currentUser={currentUser} />
              <Login />
            </div>
          </Route>
          <ConditionalRoute shouldDisplayRoute={this.sessionService.isAuthenticated()} defaultRoute="/login" path="/">
            <div id="main-layout">
              <Navigation />
              <div id="content-layout">
                <Header currentLocale={currentLocale} currentUser={currentUser} />
                <Router />
              </div>
            </div>
          </ConditionalRoute>
        </Switch>
      </GlobalErrorBoundary>
    );
  };
}
