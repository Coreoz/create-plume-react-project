import React from 'react';
import { createRoot } from 'react-dom/client';
import 'micro-observables/batchingForReactDom';
import { Logger } from 'simple-logging-system';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import './polyfill-loader';
import installServicesModule from './services/services-module';
import installComponentsModule from './components/components-module';
import App from './components/App';
import installApiModule from './api/api-module';
import installI18nModule from './i18n/i18n-module';
import initializeLocalizedDate from './i18n/messages/LocalizedDate';
import LocaleService from './i18n/locale/LocaleService';

const currentMillis = Date.now();
const logger = new Logger('index');

const injector = new Injector();
installServicesModule(injector);
installComponentsModule(injector);
installApiModule(injector);
installI18nModule(injector);

injector.initializeSingletonInstances();

configureGlobalInjector(injector);

// dayjs
initializeLocalizedDate(injector.getInstance(LocaleService));

const reactApp = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(reactApp);

logger.info(`Application started in ${Date.now() - currentMillis}ms`);
