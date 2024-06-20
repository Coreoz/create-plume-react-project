import { MessageResolver } from '@lib/plume-messages/MessageResolver';
import { FieldError } from 'react-hook-form';

export function formErrorToMessage(
  messageResolver: MessageResolver, error: FieldError, errorMapping?: (error: FieldError) => string | undefined,
): string {
  if (errorMapping) {
    const errorMappingMessage: string | undefined = errorMapping(error);
    if (errorMappingMessage) {
      return errorMappingMessage;
    }
  }
  return messageResolver(`error.field.${error.type}`);
}

export function makeErrorMessageMapping(message: string, type: string = 'validate') {
  return (error: FieldError) => {
    if (error.type === type) {
      return message;
    }
    return undefined;
  };
}
