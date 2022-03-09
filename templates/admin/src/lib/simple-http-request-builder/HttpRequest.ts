import HttpMethod from './HttpMethod';

/**
 * Represent a request HTTP query parameter with its key, the first value of the array,
 * and its value, the second value of the array
 */
export type HttpQueryParam = [string, HttpQueryParamValue];
export type HttpQueryParamValue = number | string | boolean;

/**
 * The options available for the request.
 */
export type HttpOptions = {
  /**
   * The request timeout in milliseconds. Default timeout is {@link HTTP_DEFAULT_TIMEOUT_IN_MILLIS}.
   */
  timeoutInMillis: number,
  /**
   * The {@link AbortController} that will be used to cancel the request once the timeout is reach.
   */
  timeoutAbortController: AbortController,
};

/**
 * 20 seconds timeout.
 */
export const HTTP_DEFAULT_TIMEOUT_IN_MILLIS = 20000;

/**
 * An HTTP request configuration (endpoint, headers, body, etc.)
 * with an attached {@link httpClient} to execute the request when it is ready.
 */
export default class HttpRequest<T> {
  /**
   * The client that will take the request as a parameter, execute it, and return a result.
   * This result can be a {@link Promise}.
   *
   * This value is set in the {@link constructor}.
   */
  readonly httpClient: (request: HttpRequest<unknown>) => T;

  /**
   * The base URL. A valid base URL is: http://hostname/api
   *
   * This value is set in the {@link constructor}.
   */
  readonly baseUrl: string;

  /**
   * The HTTP method used for the request, see {@link HttpMethod}.
   *
   * This value is set in the {@link constructor}.
   */
  readonly method: HttpMethod;

  /**
   * The path of the endpoint to call, it should be composed with a leading slash
   * and will be appended to the {@link baseUrl}. A valid path is: /users
   *
   * This value is set in the {@link constructor}.
   */
  readonly path: string;

  /**
   * The request HTTP headers.
   *
   * This value is set in the {@link headers} method.
   */
  readonly headersValue: HeadersInit;

  /**
   * The request string body.
   *
   * This value should be set using {@link body} or {@link jsonBody} methods.
   */
  bodyValue?: string;

  /**
   * The query parameters of the request.
   *
   * This value should be set using the {@link queryParams} method.
   */
  queryParamsValue: HttpQueryParam[];

  /**
   * The request {@link HttpOptions}.
   *
   * This value is set in the {@link options} method.
   */
  readonly optionValues: HttpOptions;

  /**
   * @param httpClient The client that will take the request as a parameter, execute it, and return a result.
   * This result can be a {@link Promise}
   * @param baseUrl The base URL. It should not contain an ending slash. A valid base URL is: http://hostname/api
   * @param method The HTTP method used for the request, see {@link HttpMethod}
   * @param path The path of the endpoint to call, it should be composed with a leading slash
   * and will be appended to the {@link baseUrl}. A valid path is: /users
   * @param options The options used for the request
   */
  constructor(
    httpClient: (request: HttpRequest<unknown>) => T,
    baseUrl: string,
    method: HttpMethod,
    path: string,
    options?: Partial<HttpOptions>,
  ) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
    this.method = method;
    this.path = path;
    this.headersValue = {};
    this.queryParamsValue = [];
    this.bodyValue = undefined;
    this.optionValues = {
      timeoutInMillis: options?.timeoutInMillis ?? HTTP_DEFAULT_TIMEOUT_IN_MILLIS,
      timeoutAbortController: options?.timeoutAbortController ?? new AbortController(),
    };
  }

  /**
   * Add one or multiple headers to the request.
   * @param headers A key/value object with:
   * **key**: the header name,
   * **value**: the header value.
   * A valid headers object is: `{Authorization: 123, Cookie: csrfToken=abcd}`.
   */
  headers(headers: Record<string, string>) {
    Object.assign(this.headersValue, headers);
    return this;
  }

  /**
   * Add one or multiple query parameters. A sample usage is:
   * `request.queryParams([['country', 'Россия'],['fruits', 'Oranges & Bananas']])`.
   * @param queryParams An array of the query parameters
   */
  queryParams(queryParams: HttpQueryParam[]) {
    this.queryParamsValue = queryParams;
    return this;
  }

  /**
   * Add request options that will be passed to the HTTP client. See {@link HttpOptions} for available options.
   * @param options One or multiple options to attach the request
   */
  options(options: Partial<HttpOptions>) {
    Object.assign(this.optionValues, options);
    return this;
  }

  /**
   * Add a string raw object body. This call should generally be followed by a {@link headers} call
   * to specify the content type of the body. For exemple:
   * `request.body('<amount>123</amount>').headers({'Content-Type': 'application/xml'})`.
   *
   * Note that to add a JSON body, the method {@link jsonBody} is easier to use.
   * @param body The string body to attach the request
   */
  body(body?: string) {
    this.bodyValue = body;
    return this;
  }

  /**
   * Add a JavaScript object as a JSON body for the request. This method will:
   * - Take care of the "stringification" of the JS object
   * - Add the `'Content-Type': 'application/json'``to the request
   *
   * To add a non JSON body to the request, {@link body} should be used.
   * @param objectBody A JavaScript object that will be used as a JSON body
   */
  jsonBody(objectBody: Object) {
    this.headers({ 'Content-Type': 'application/json' });
    this.body(JSON.stringify(objectBody));
    return this;
  }

  /**
   * Build a query string starting with `?`
   * and with escaped parameter names and values, see {@link encodeURIComponent} for encoding.
   *
   * For example:
   * - `buildQueryString([['country', 'Россия'],['fruits', 'Oranges & Bananas']])`
   * - returns `?country=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F&fruits=Oranges%20%26%20Bananas`
   *
   * This method is used in {@link buildUrl}.
   * @param queryParams An array of the query parameters
   */
  static buildQueryString(queryParams: HttpQueryParam[]) {
    if (queryParams.length > 0) {
      return `?${
        queryParams
          .map((param) => `${encodeURIComponent(param[0])}=${encodeURIComponent(param[1])}`)
          .join('&')}`;
    }
    return '';
  }

  /**
   * Build the full request URL using {@link baseUrl}, {@link path}, {@link queryParamsValue}.
   */
  buildUrl() {
    return encodeURI(this.baseUrl + this.path) + HttpRequest.buildQueryString(this.queryParamsValue);
  }

  /**
   * Execute the request using the {@link httpClient}.
   */
  execute(): T {
    return this.httpClient(this);
  }
}
