import { Injector } from 'plume-ts-di';
import UserApi from './api/UserApi';

export default function installPlumeAdminUsersModule(injector: Injector) {
  injector.registerSingleton(UserApi);
}
