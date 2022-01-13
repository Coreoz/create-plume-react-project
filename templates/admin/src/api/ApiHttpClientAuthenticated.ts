import HttpMethod from '../lib/simple-http-request-builder/HttpMethod';
import HttpRequest from '../lib/simple-http-request-builder/HttpRequest';
import HttpPromise from '../lib/plume-http/promise/HttpPromise';
import SessionService from '../services/session/SessionService';
import ApiHttpClient from './ApiHttpClient';
import PlumeAdminHttpClient from '../lib/plume-admin-api/PlumeHttpClient';

export default class ApiHttpClientAuthenticated implements PlumeAdminHttpClient {
  constructor(private readonly httpClient: ApiHttpClient,
    private readonly sessionService: SessionService) {
  }

  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return this
      .httpClient
      .rawRequest(method, path)
      .headers({ Authorization: `Bearer ${this.sessionService.getSessionToken().get()}` });
  }

  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return this
      .httpClient
      .restRequest<T>(method, path)
      .headers({ Authorization: `Bearer ${this.sessionService.getSessionToken().get()}` });
  }
}
