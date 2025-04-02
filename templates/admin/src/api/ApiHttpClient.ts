import { HttpMethod, HttpRequest } from 'simple-http-request-builder';
import {
  createHttpFetchRequest, defaultJsonFetchClient, fetchClient, HttpPromise,
} from 'simple-http-rest-client';

const baseUrl: string = `${window.location.protocol}//${window.location.host}/api`;

export default class ApiHttpClient {

  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return createHttpFetchRequest<Response>(baseUrl, method, path, fetchClient);
  }

  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return createHttpFetchRequest<T>(baseUrl, method, path, defaultJsonFetchClient);
  }
}
