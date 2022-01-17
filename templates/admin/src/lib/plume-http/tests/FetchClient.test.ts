import ApiHttpClient from '../../../api/ApiHttpClient';
import HttpMethod from '../../simple-http-request-builder/HttpMethod';

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

const mockedFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
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
});
