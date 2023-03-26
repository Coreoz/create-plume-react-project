import { HttpMethod, HttpRequest } from 'simple-http-request-builder';
import {
  createHttpFetchRequest, defaultJsonFetchClient, fetchClient, HttpPromise,
} from 'simple-http-rest-client';

const baseUrl = `${window.location.protocol}//${window.location.host}/api`;

export default class ApiHttpClient {
  // eslint-disable-next-line class-methods-use-this
  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return createHttpFetchRequest(baseUrl, method, path, fetchClient);
  }

  // eslint-disable-next-line class-methods-use-this
  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return createHttpFetchRequest(baseUrl, method, path, defaultJsonFetchClient);
  }
}
