import { Injector } from 'plume-ts-di';
import AdminTheme from './theme/AdminTheme';
import PlumeAdminTheme from '@lib/plume-admin-theme/PlumeAdminTheme';
import NotificationRenderer from './theme/NotificationRenderer';

export default function installComponentsModule(injector: Injector) {
  injector.registerSingleton(AdminTheme, PlumeAdminTheme);
  injector.registerSingleton(NotificationRenderer);
}
