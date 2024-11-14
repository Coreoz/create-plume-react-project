import { Scheduler } from 'simple-job-scheduler';
import { Injector } from 'plume-ts-di';
import SampleService from './sample/SampleService';

export default function installServicesModule(injector: Injector) {
  injector.registerSingleton(Scheduler);
  // sample service to delete
  injector.registerSingleton(SampleService);
}
