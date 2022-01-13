import HttpMethod from '../simple-http-request-builder/HttpMethod';
import HttpRequest from '../simple-http-request-builder/HttpRequest';
import HttpPromise from '../plume-http/promise/HttpPromise';

/**
 * The HTTP API client used for Plume admin.
 *
 * This client must perform authenticated HTTP API calls, generally using a header `Authorization: Bearer <token>`
 */
export default abstract class PlumeAdminHttpClient {
  abstract rawRequest(method: HttpMethod, path: string): HttpRequest<HttpPromise<Response>>;

  abstract restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>>;
}
