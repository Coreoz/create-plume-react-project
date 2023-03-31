import { useObservable } from 'micro-observables';
import PlumeMessageResolver from './MessageResolver';
import PlumeMessageResolverService from './MessageResolverService';

export default function useMessagesResolver(messageResolverService: PlumeMessageResolverService): PlumeMessageResolver {
  return useObservable(messageResolverService.getMessages());
}
