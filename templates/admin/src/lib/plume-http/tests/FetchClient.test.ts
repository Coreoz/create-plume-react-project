import ApiHttpClient from '../../../api/ApiHttpClient';
import HttpMethod from '../../simple-http-request-builder/HttpMethod';
import { genericError, networkError, timeoutError } from '../client/HttpResponse';
import fetchClient from '../client/FetchClient';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import { unwrapHttpPromise } from '../promise/HttpPromise';

let mockedFetchResponseBody: string | undefined;
const mockedFetchResponseStatus: ResponseInit = {
  status: 200,
  statusText: 'Ok',
  // headers
};
let mockedPromiseError: Error | undefined;

const setMockedBody = (responseObject: object) => {
  mockedFetchResponseBody = JSON.stringify(responseObject);
};

const mockedFetch = (): Promise<Response> => {
  if (mockedPromiseError) {
    return Promise.reject(mockedPromiseError);
  }
  return Promise.resolve(new Response(mockedFetchResponseBody, mockedFetchResponseStatus));
};

describe('Tests on Login', () => {
  const oldFetch = global.fetch;
  global.fetch = mockedFetch;

  beforeEach(() => {
    mockedPromiseError = undefined;
    mockedFetchResponseBody = undefined;
  });

  afterAll(() => {
    global.fetch = oldFetch;
  });

  test('Check simple request sample', async () => {
    setMockedBody({ test: 1 });
    const response = await new ApiHttpClient()
      .rawRequest(HttpMethod.GET, '/users')
      .execute()
      .toPromise();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ test: 1 });
  });

  test('Check network error rejects promise with networkError', async () => {
    mockedPromiseError = new Error();
    const response = new ApiHttpClient()
      .rawRequest(HttpMethod.GET, '/users')
      .execute()
      .toPromise();
    await expect(response).rejects.toEqual(networkError);
  });

  test('Check timeout error rejects promise with timeoutError', async () => {
    mockedPromiseError = new Error();
    mockedPromiseError.name = 'AbortError';
    const response = new ApiHttpClient()
      .rawRequest(HttpMethod.GET, '/users')
      .execute()
      .toPromise();
    await expect(response).rejects.toEqual(timeoutError);
  });

  test('Check handler execution error rejects promise with genericError', async () => {
    const httpClientWithErrorHandler = (httpRequest: HttpRequest<unknown>) => unwrapHttpPromise(fetchClient(
      httpRequest, () => { throw new Error(); },
    ));
    const response = new HttpRequest(
      httpClientWithErrorHandler,
      'http://localhost',
      HttpMethod.GET,
      '/users',
    ).execute();
    await expect(response).rejects.toEqual(genericError);
  });
});
