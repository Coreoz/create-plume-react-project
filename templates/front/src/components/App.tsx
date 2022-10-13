import React, { useMemo } from 'react';
import { useObservable } from 'micro-observables';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import LocaleService from '../i18n/locale/LocaleService';
import initializeLocalizedDate from '../i18n/messages/LocalizedDate';
import Home from './pages/Home';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';

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

    const router = useMemo(() => createBrowserRouter([
      {
        path: '/',
        element: <Layout><Outlet /></Layout>,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ]), [currentLocale]);

    logger.info('Render App');
    return <RouterProvider router={router} />;
  };
}
