import { HttpMethod, HttpRequest } from 'simple-http-request-builder';
import {
  createHttpFetchRequest, FetchResponseHandler, fetchClient, HttpPromise, HttpResponse, jsonContentTypeValidator,
  toJsonResponse, validateBasicStatusCodes,
} from 'simple-http-rest-client';
import { Logger } from 'simple-logging-system';

const baseUrl: string = `${window.location.protocol}//${window.location.host}/api`;

const logger: Logger = new Logger('ApiHttpClient');

/**
 * Logs an error when the API rejects a request because its body is too large.
 *
 * Returns `undefined` so that the other response handlers keep processing the response.
 */
const logContentSizeLimitExceeded: FetchResponseHandler = (response: Response) => {
  if (response.status === 413) {
    logger.error(
      `Request body too large: the API rejected the request with HTTP 413 on ${response.url}`,
      { status: response.status, url: response.url },
    );
  }
  return undefined;
};

const jsonFetchClient = <T>(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<T>> => fetchClient<T>(
  httpRequest,
  logContentSizeLimitExceeded,
  validateBasicStatusCodes,
  jsonContentTypeValidator,
  toJsonResponse,
);

const rawFetchClient = (httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Response>> => fetchClient<Response>(
  httpRequest,
  logContentSizeLimitExceeded,
);

export default class ApiHttpClient {
  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return createHttpFetchRequest<Response>(baseUrl, method, path, rawFetchClient);
  }

  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return createHttpFetchRequest<T>(baseUrl, method, path, jsonFetchClient);
  }
}
