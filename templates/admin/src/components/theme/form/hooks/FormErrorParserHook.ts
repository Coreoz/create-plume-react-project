import {
  formErrorToMessage,
} from '@lib/plume-form-error-messages/FormErrorMessages';
import PlumeMessageResolver from '@lib/plume-messages/MessageResolver';
import PlumeMessageResolverService
  from '@lib/plume-messages/MessageResolverService';
import useMessagesResolver from '@lib/plume-messages/messagesResolveHook';
import { getGlobalInstance } from 'plume-ts-di';
import { FieldError } from 'react-hook-form';

type FormErrorParserOptions = {
  errorMapping?: (error: FieldError) => string | undefined,
};

type FormErrorParserHookType = {
  parseError: (fieldError: FieldError) => string,
};

function useFormErrorParser(options?: FormErrorParserOptions): FormErrorParserHookType {
  const messageResolver: PlumeMessageResolver = useMessagesResolver(getGlobalInstance(PlumeMessageResolverService));

  return {
    parseError: (fieldError: FieldError) => formErrorToMessage(
      messageResolver.t.bind(messageResolver),
      fieldError,
      options?.errorMapping,
    ),
  };
}

export default useFormErrorParser;
