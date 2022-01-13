import { Logger } from 'simple-logging-system';
import {
  genericError, HttpError, HttpResponse, toErrorResponsePromise,
} from './HttpResponse';
import fetchClient, { FetchResponseHandler } from './FetchClient';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import validateBasicStatusCodes from './FetchStatusValidators';

const logger = new Logger('JsonFetchClient');

export const jsonContentTypeValidator: FetchResponseHandler = (
  response: Response,
  jsonContentType: string = 'application/json',
) => {
  // make sure the response is a JSON one
  const contentType = response.headers.get('content-type');
  if (contentType === null || contentType.indexOf(jsonContentType) === -1) {
    logger.error('Response type is not JSON', response);
    return toErrorResponsePromise(genericError);
  }

  return undefined;
};

// any is the returned type of the Fetch.json() Promise
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonErrorMapper = (response: Response, json: any) => HttpError;

export const defaultJsonErrorMapper: JsonErrorMapper = (response: Response, json) => {
  if (typeof json.errorCode === 'undefined') {
    logger.error('Unrecognized JSON error', response);
    return genericError;
  }
  return json;
};

export const fetchJsonResponse: FetchResponseHandler = (
  response: Response,
  jsonErrorMapper: JsonErrorMapper = defaultJsonErrorMapper,
) => response
  .json()
  .then((json) => {
    if (response.ok) {
      return {
        response: json,
      };
    }
    return {
      error: jsonErrorMapper(response, json),
    };
  })
  .catch((error) => {
    logger.error('Cannot parse JSON', error);
    return {
      error: genericError,
    };
  });

const defaultJsonFetchClient = <T>(httpRequest: HttpRequest<unknown>)
  : Promise<HttpResponse<T>> => fetchClient(
    httpRequest, validateBasicStatusCodes, jsonContentTypeValidator, fetchJsonResponse,
  );

export default defaultJsonFetchClient;
