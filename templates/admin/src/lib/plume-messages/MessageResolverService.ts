import { Observable } from 'micro-observables';
import PlumeMessageResolver from './MessageResolver';

/**
 * Return the observable message interface
 */
export default abstract class PlumeMessageResolverService {
  abstract getMessages(): Observable<PlumeMessageResolver>;
}
