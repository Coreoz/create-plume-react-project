import { HttpRequest, HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import SessionService from '../services/session/SessionService';
import ApiHttpClient from './ApiHttpClient';
import PlumeAdminHttpClient from '../lib/plume-admin-api/PlumeHttpClient';

export default class ApiHttpClientAuthenticated implements PlumeAdminHttpClient {
  constructor(private readonly httpClient: ApiHttpClient,
    private readonly sessionService: SessionService) {
  }

  /**
   * Add configuration for requests made with this client.
   *
   * Here the authorization token is added to each "authenticated request".
   */
  private configureRequest<T>(httpRequest: HttpRequest<T>) {
    return httpRequest.headers({ Authorization: `Bearer ${this.sessionService.getSessionToken().get()}` });
  }

  rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>> {
    return this.configureRequest(
      this.httpClient.rawRequest(method, path),
    );
  }

  restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
    return this.configureRequest(
      this.httpClient.restRequest<T>(method, path),
    );
  }
}
