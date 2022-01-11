import { Logger } from 'simple-logging-system';
import { genericError, HttpPlumeResponse, makeErrorPromiseResponse } from './PlumeHttpResponse';
import fetchClient, { FetchResponseHandler } from './FetchClient';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import validateBasicStatusCodes from './FetchStatusValidators';

const logger = new Logger('JsonFetchClient');

export const jsonContentTypeValidator: FetchResponseHandler = (response: Response) => {
  // make sure the response is a JSON one
  const contentType = response.headers.get('content-type');
  if (contentType === null || contentType.indexOf('application/json') === -1) {
    logger.error('Response type is not JSON', response);
    return makeErrorPromiseResponse(genericError);
  }

  return undefined;
};

// TODO ajouter un paramètre toJsonError pour convertir une erreur JSON serveur en erreur HttpPlumeError
export const fetchJsonResponse: FetchResponseHandler = (response: Response) => response
  .json()
  .then((json) => {
    if (response.ok) {
      return {
        response: json,
      };
    }
    if (typeof json.errorCode === 'undefined') {
      logger.error('Unrecognized JSON error', response);
      return {
        error: genericError,
      };
    }
    return {
      error: json,
    };
  })
  .catch((error) => {
    logger.error('Cannot parse JSON', error);
    return {
      error: genericError,
    };
  });

const jsonFetchClient = <T>(httpRequest: HttpRequest<unknown>)
  : Promise<HttpPlumeResponse<T>> => fetchClient(
    httpRequest, validateBasicStatusCodes, jsonContentTypeValidator, fetchJsonResponse,
  );

export default jsonFetchClient;
