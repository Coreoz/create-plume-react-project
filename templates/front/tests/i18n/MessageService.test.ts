import MessageService from '@i18n/messages/MessageService';
import enMessages from '@i18n/translations/en';
import frMessages from '@i18n/translations/fr';
import { HttpError } from 'simple-http-rest-client';
import { describe, expect, it } from 'vitest';

const contentSizeLimitExceeded: HttpError = {
  errorCode: 'CONTENT_SIZE_LIMIT_EXCEEDED',
  statusArguments: [],
};

describe('MessageService.httpError with CONTENT_SIZE_LIMIT_EXCEEDED', () => {
  it('returns a French message', () => {
    expect(MessageService.httpError(frMessages.get(), contentSizeLimitExceeded))
      .toBe('Le contenu envoyé est trop volumineux pour le serveur');
  });

  it('returns an English message', () => {
    expect(MessageService.httpError(enMessages.get(), contentSizeLimitExceeded))
      .toBe('The content sent is too large for the server');
  });
});
