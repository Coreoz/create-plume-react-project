import { HttpRequest, HttpMethod } from 'simple-http-request-builder';
import {
  defaultJsonFetchClient, fetchClient, HttpPromise, unwrapHttpPromise,
} from 'simple-http-rest-client';

const baseUrl = '/api';

export default class ApiHttpClient {
  // eslint-disable-next-line class-methods-use-this
  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return new HttpRequest<HttpPromise<Response>>(
      (httpRequest) => new HttpPromise<Response>(
        unwrapHttpPromise(fetchClient(httpRequest)),
        httpRequest,
      ),
      baseUrl,
      method,
      path,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return new HttpRequest<HttpPromise<T>>(
      (httpRequest) => new HttpPromise<T>(
        unwrapHttpPromise(defaultJsonFetchClient(httpRequest)),
        httpRequest,
      ),
      baseUrl,
      method,
      path,
    );
  }
}
