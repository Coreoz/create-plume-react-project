import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import SessionApi from './session/SessionApi';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(SessionApi);
}
