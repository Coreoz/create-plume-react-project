import HttpMethod from '../simple-http-request-builder/HttpMethod';
import HttpRequest from '../simple-http-request-builder/HttpRequest';
import PlumeHttpPromise from '../plume-http/promise/PlumeHttpPromise';

/**
 * The HTTP API client used for Plume admin.
 *
 * This client must perform authenticated HTTP API calls, generally using a header `Authorization: Bearer <token>`
 */
export default abstract class PlumeAdminHttpClient {
  abstract rawRequest(method: HttpMethod, path: string): HttpRequest<PlumeHttpPromise<Response>>;

  abstract restRequest<T>(method: HttpMethod, path: string): HttpRequest<PlumeHttpPromise<T>>;
}
