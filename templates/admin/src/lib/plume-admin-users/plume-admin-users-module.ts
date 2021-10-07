import { Injector } from 'plume-ts-di';
import Users from './pages/Users';
import UsersEdit from './pages/UsersEdit';
import UsersList from './pages/UsersList';
import UserApi from './api/UserApi';

export default function installPlumeAdminUsersModule(injector: Injector) {
  injector.registerSingleton(UserApi);
  injector.registerSingleton(Users);
  injector.registerSingleton(UsersEdit);
  injector.registerSingleton(UsersList);
}
