import { Logger } from 'simple-logging-system';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import {
  genericError,
  HttpResponse,
  toErrorResponsePromise,
  networkError,
  timeoutError,
} from './HttpResponse';

const logger = new Logger('FetchClient');

export const fetchClientExecutor = (httpRequest: HttpRequest<unknown>): Promise<Response> => {
  const timeoutHandle = setTimeout(
    () => httpRequest.optionValues.timeoutAbortController.abort(),
    httpRequest.optionValues.timeoutInMillis,
  );
  return fetch(
    httpRequest.buildUrl(),
    {
      headers: httpRequest.headersValue,
      method: httpRequest.method,
      body: httpRequest.bodyValue,
      credentials: 'same-origin',
      signal: httpRequest.optionValues.timeoutAbortController.signal,
    },
  )
    .finally(() => clearTimeout(timeoutHandle));
};

export const networkErrorCatcher = <T>(error: Error): HttpResponse<T> => {
  if (error.name === 'AbortError') {
    return {
      error: timeoutError,
    };
  }
  logger.error('Cannot connect to HTTP server due to a network error', error);
  return {
    error: networkError,
  };
};

export interface FetchResponseHandler<T = unknown> {
  (response: Response): Promise<HttpResponse<T>> | undefined;
}

const fetchClient = <T = Response>(httpRequest: HttpRequest<unknown>, ...handlers: FetchResponseHandler[])
  : Promise<HttpResponse<T>> => <Promise<HttpResponse<T>>> fetchClientExecutor(httpRequest)
    .then((response) => {
      for (const handler of handlers) {
        try {
          const handlerResult = handler(response);
          if (handlerResult !== undefined) {
            return handlerResult;
          }
        } catch (error) {
          logger.error('Error executing handler', handler, error);
          return toErrorResponsePromise(genericError);
        }
      }
      return { response };
    })
    .catch(networkErrorCatcher);

export default fetchClient;
