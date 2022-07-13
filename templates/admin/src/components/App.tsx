import { useObservable } from 'micro-observables';
import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Logger } from 'simple-logging-system';
import LocaleService from '../i18n/locale/LocaleService';
import initializeLocalizedDate from '../i18n/messages/LocalizedDate';
import SessionService from '../services/session/SessionService';
import Router from './layout/Router';
import Header from './layout/Header';
import Navigation from './navigation/Navigation';
import ConditionalRoute from './theme/routes/ConditionalRoute';
import Login from './features/login/Login';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';
import NotificationRenderer from './theme/NotificationRenderer';

const logger = new Logger('App');
const basePath = '/admin';

export default class App {
  constructor(
    private readonly localeService: LocaleService,
    private readonly sessionService: SessionService,
    private readonly notificationRenderer: NotificationRenderer,
  ) {
    // dayjs
    initializeLocalizedDate(localeService);

    notificationRenderer.initialize();

    // react router redirection is not made anymore :(, see https://github.com/remix-run/react-router/issues/8427
    if (window && !window.location.pathname.startsWith(basePath)) {
      window.history.replaceState('', '', basePath + window.location.pathname);
    }
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
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={(
                <ConditionalRoute shouldDisplayRoute={this.sessionService.isAuthenticated()} defaultRoute="/login">
                  <div id="main-layout">
                    <Navigation />
                    <div id="content-layout">
                      <Header currentLocale={currentLocale} currentUser={currentUser} />
                      <Router />
                    </div>
                  </div>
                </ConditionalRoute>
              )}
            />
          </Routes>
        </BrowserRouter>
      </GlobalErrorBoundary>
    );
  };
}
