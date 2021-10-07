import HttpMethod from '../lib/simple-http-request-builder/HttpMethod';
import HttpRequest from '../lib/simple-http-request-builder/HttpRequest';
import PlumeHttpPromise from '../lib/plume-http/promise/PlumeHttpPromise';
import PlumeHttpClientHelpers from '../lib/plume-http/client/PlumeHttpClientHelpers';

const baseUrl = '/api';

export default class ApiHttpClient {
  // eslint-disable-next-line class-methods-use-this
  rawRequest(method: HttpMethod, path: string): HttpRequest<Promise<Response>> {
    return new HttpRequest<Promise<Response>>(
      (httpRequest) => PlumeHttpClientHelpers.execute(httpRequest),
      baseUrl,
      method,
      path,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  restRequest<T>(method: HttpMethod, path: string): HttpRequest<PlumeHttpPromise<T>> {
    return new HttpRequest<PlumeHttpPromise<T>>(
      (httpRequest) => new PlumeHttpPromise<T>(httpRequest, PlumeHttpClientHelpers.executeRest(httpRequest)),
      baseUrl,
      method,
      path,
    );
  }
}
