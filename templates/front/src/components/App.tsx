import React from 'react';
import { useObservable } from 'micro-observables';
import { Route, Switch } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import SessionService from '../services/session/SessionService';
import Header from './layout/Header';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';
import LocaleService from '../i18n/locale/LocaleService';
import initializeLocalizedDate from '../i18n/messages/LocalizedDate';
import { HOME } from './Routes';

const logger = new Logger('App');

export default class App {
  constructor(
    private readonly localeService: LocaleService,
    private readonly sessionService: SessionService,
  ) {
    // dayjs
    initializeLocalizedDate(localeService);
  }

  render = () => {
    // we need to observe at the top level the current locale
    // to rerender the whole application if the current locale changes
    const currentLocale = useObservable(this.localeService.getCurrentLocale());
    const currentUser = useObservable(this.sessionService.getCurrentUser());

    logger.info('Render App');
    return (
      <GlobalErrorBoundary>
        <Switch>
          <Route exact path={HOME}>
            <div id="home-layout">
              <Header currentLocale={currentLocale} currentUser={currentUser} />
              <div>Homepage</div>
            </div>
          </Route>
        </Switch>
      </GlobalErrorBoundary>
    );
  };
}
