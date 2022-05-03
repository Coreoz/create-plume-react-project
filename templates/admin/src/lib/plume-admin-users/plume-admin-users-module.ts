import { Injector } from 'plume-ts-di';
import UserApi from './api/UserApi';
import Users from './pages/Users';
import UsersEdit from './pages/UsersEdit';

export default function installPlumeAdminUsersModule(injector: Injector) {
  injector.registerSingleton(UserApi);
  injector.registerSingleton(Users);
  injector.registerSingleton(UsersEdit);
}
