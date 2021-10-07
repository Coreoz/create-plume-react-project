import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import ApiHttpClientAuthenticated from './ApiHttpClientAuthenticated';
import SessionApi from './session/SessionApi';
import PlumeAdminHttpClient from '../lib/plume-admin-api/PlumeHttpClient';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(ApiHttpClientAuthenticated);
  injector.registerSingleton(ApiHttpClientAuthenticated, PlumeAdminHttpClient);
  injector.registerSingleton(SessionApi);
}
