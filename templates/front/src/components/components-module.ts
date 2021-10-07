import { Injector } from 'plume-ts-di';
import App from './App';

export default function installComponentsModule(injector: Injector) {
  injector.registerSingleton(App);
}
