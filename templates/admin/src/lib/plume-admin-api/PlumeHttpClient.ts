import { HttpRequest, HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * The HTTP API client used for Plume admin.
 *
 * This client must perform authenticated HTTP API calls, generally using a header `Authorization: Bearer <token>`
 */
export default abstract class PlumeAdminHttpClient {
  abstract rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>>;

  abstract restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>>;
}
