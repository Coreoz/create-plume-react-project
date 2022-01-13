import HttpMethod from '../lib/simple-http-request-builder/HttpMethod';
import HttpRequest from '../lib/simple-http-request-builder/HttpRequest';
import PlumeHttpPromise, { unwrapHttpPromise } from '../lib/plume-http/promise/PlumeHttpPromise';
import jsonFetchClient from '../lib/plume-http/client/JsonFetchClient';
import fetchClient from '../lib/plume-http/client/FetchClient';

const baseUrl = '/api';

export default class ApiHttpClient {
  // eslint-disable-next-line class-methods-use-this
  rawRequest(method: HttpMethod, path: string): HttpRequest<PlumeHttpPromise<Response>> {
    return new HttpRequest<PlumeHttpPromise<Response>>(
      (httpRequest) => new PlumeHttpPromise<Response>(
        unwrapHttpPromise(fetchClient(httpRequest)),
        httpRequest,
      ),
      baseUrl,
      method,
      path,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  restRequest<T>(method: HttpMethod, path: string): HttpRequest<PlumeHttpPromise<T>> {
    return new HttpRequest<PlumeHttpPromise<T>>(
      (httpRequest) => new PlumeHttpPromise<T>(
        unwrapHttpPromise(jsonFetchClient(httpRequest)),
        httpRequest,
      ),
      baseUrl,
      method,
      path,
    );
  }
}
