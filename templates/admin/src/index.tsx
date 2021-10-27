import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto';
import 'react-toastify/dist/ReactToastify.css';
import 'micro-observables/batchingForReactDom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import './polyfill-loader';
import installServicesModule from './services/services-module';
import installComponentsModule from './components/components-module';
import App from './components/App';
import installApiModule from './api/api-module';
import SessionService from './services/session/SessionService';
import installI18nModule from './i18n/i18n-module';
import installPlumeAdminUsersModule from './lib/plume-admin-users/plume-admin-users-module';

const currentMillis = Date.now();
const logger = new Logger('index');

const injector = new Injector();
installServicesModule(injector);
installComponentsModule(injector);
installApiModule(injector);
installI18nModule(injector);
installPlumeAdminUsersModule(injector);

injector.initializeSingletonInstances();

configureGlobalInjector(injector);

injector.getInstance(SessionService).tryInitializingSessionFromStorage();

const app = injector.getInstance(App);
const reactApp = (
  <React.StrictMode>
    <Router basename="/admin">
      <app.render />
    </Router>
  </React.StrictMode>
);
const domElement = document.getElementById('root');

ReactDOM.render(reactApp, domElement);

logger.info(`Application started in ${Date.now() - currentMillis}ms`);
