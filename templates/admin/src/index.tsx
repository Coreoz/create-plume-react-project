import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import 'micro-observables/batchingForReactDom';
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
import initializeLocalizedDate from './i18n/messages/LocalizedDate';
import LocaleService from './i18n/locale/LocaleService';
import NotificationRenderer from './components/theme/NotificationRenderer';

const currentMillis: number = Date.now();
const logger: Logger = new Logger('index');

const injector: Injector = new Injector();
installServicesModule(injector);
installComponentsModule(injector);
installApiModule(injector);
installI18nModule(injector);
installPlumeAdminUsersModule(injector);

injector.initializeSingletonInstances();

configureGlobalInjector(injector);

const sessionService: SessionService = injector.getInstance(SessionService);
sessionService.tryInitializingSessionFromStorage();
sessionService.synchronizeSessionFromOtherBrowserTags();

// dayjs
initializeLocalizedDate(injector.getInstance(LocaleService));
// notifications display management
injector.getInstance(NotificationRenderer).initialize();

const reactApp: JSX.Element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(reactApp);

logger.info(`Application started in ${Date.now() - currentMillis}ms`);
