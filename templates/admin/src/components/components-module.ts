import { Injector } from 'plume-ts-di';
import PlumeAdminTheme from '../lib/plume-admin-theme/PlumeAdminTheme';
import AdminTheme from './theme/AdminTheme';
import NotificationRenderer from './theme/NotificationRenderer';

export default function installComponentsModule(injector: Injector) {
  injector.registerSingleton(AdminTheme, PlumeAdminTheme);
  injector.registerSingleton(NotificationRenderer);
}
