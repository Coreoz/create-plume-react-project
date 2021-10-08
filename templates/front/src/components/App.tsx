import React from 'react';
import { useObservable } from 'micro-observables';
import { Route, Switch } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Header from './layout/Header';
import GlobalErrorBoundary from './theme/GlobalErrorBoundary';
import LocaleService from '../i18n/locale/LocaleService';
import initializeLocalizedDate from '../i18n/messages/LocalizedDate';
import Home from './pages/Home';

const logger = new Logger('App');

export default class App {
  constructor(
    private readonly localeService: LocaleService,
  ) {
    // dayjs
    initializeLocalizedDate(localeService);
  }

  render = () => {
    // we need to observe at the top level the current locale
    // to rerender the whole application if the current locale changes
    const currentLocale = useObservable(this.localeService.getCurrentLocale());

    logger.info('Render App');
    return (
      <GlobalErrorBoundary>
        <Switch>
          <Route>
            <div id="home-layout">
              <Header currentLocale={currentLocale} />
              <Home />
            </div>
          </Route>
        </Switch>
      </GlobalErrorBoundary>
    );
  };
}
