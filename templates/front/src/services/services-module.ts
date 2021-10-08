import { Scheduler } from 'simple-job-scheduler';
import { Injector } from 'plume-ts-di';
import SessionService from './session/SessionService';
import IdlenessDetector from '../lib/user-session/IdlenessDetector';
import BrowserPageActivityManager from '../lib/user-session/page-activity/BrowserPageActivityManager';
import PageActivityManager from '../lib/user-session/page-activity/PageActivityManager';
import BrowserUserActivityListener from '../lib/user-session/user-activity/BrowserUserActivityListener';
import UserActivityListener from '../lib/user-session/user-activity/UserActivityListener';

export default function installServicesModule(injector: Injector) {
  // browser dependent services
  injector.registerSingleton(BrowserPageActivityManager, PageActivityManager);
  injector.registerSingleton(BrowserUserActivityListener, UserActivityListener);
  // other services
  injector.registerSingleton(IdlenessDetector);
  injector.registerSingleton(SessionService);
  injector.registerSingleton(Scheduler);
}
