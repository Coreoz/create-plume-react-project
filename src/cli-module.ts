import { Injector } from 'plume-ts-di';
import Config from './config/Config';
import Creator from './creator/Creator';

export default function installCliModule(injector: Injector) {
  injector.registerSingleton(Config);
  injector.registerSingleton(Creator);
}
