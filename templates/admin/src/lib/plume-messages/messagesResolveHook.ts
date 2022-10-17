import { useObservable } from 'micro-observables';
import PlumeMessageResolverService from './MessageResolverService';
import PlumeMessageResolver from './MessageResolver';

export default function useMessagesResolver(messageResolverService: PlumeMessageResolverService): PlumeMessageResolver {
  return useObservable(messageResolverService.getMessages());
}
