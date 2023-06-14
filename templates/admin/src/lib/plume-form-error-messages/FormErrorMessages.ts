import { FieldError } from 'react-hook-form';
import { MessageResolver } from '../plume-messages/MessageResolver';

export function formErrorToMessage(
  messageResolver: MessageResolver, error: FieldError, errorMapping?: (error: FieldError) => string | undefined,
): string {
  if (errorMapping) {
    const errorMappingMessage: string | undefined = errorMapping(error);
    if (errorMappingMessage) {
      return errorMappingMessage;
    }
  }
  if (error.type === 'required') {
    return messageResolver('error.field.required');
  }
  return `Unhandled error: ${error.type} - ${error.message}`;
}

export function makeErrorMessageMapping(message: string, type: string = 'validate') {
  return (error: FieldError) => {
    if (error.type === type) {
      return message;
    }
    return undefined;
  };
}
