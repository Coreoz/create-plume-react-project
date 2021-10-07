import HttpMethod from './HttpMethod';

export type HttpQueryParam = [string, HttpQueryParamValue];
export type HttpQueryParamValue = number | string | boolean;
export type HttpOptions = {
  timeoutInMillis: number,
};

export const HTTP_DEFAULT_TIMEOUT_IN_MILLIS = 20000;

export default class HttpRequest<T> {
  readonly httpClient: (request: HttpRequest<unknown>) => T;

  readonly baseUrl: string;

  readonly method: HttpMethod;

  readonly path: string;

  readonly headersValue: HeadersInit;

  bodyValue?: string;

  queryParamsValue: HttpQueryParam[];

  readonly optionValues: HttpOptions;

  constructor(
    httpClient: (request: HttpRequest<unknown>) => T,
    baseUrl: string,
    method: HttpMethod,
    path: string,
  ) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
    this.method = method;
    this.path = path;
    this.headersValue = {};
    this.queryParamsValue = [];
    this.bodyValue = undefined;
    this.optionValues = {
      timeoutInMillis: HTTP_DEFAULT_TIMEOUT_IN_MILLIS,
    };
  }

  headers(headers: HeadersInit) {
    Object.assign(this.headersValue, headers);
    return this;
  }

  body(body?: string) {
    this.bodyValue = body;
    return this;
  }

  queryParams(queryParams: HttpQueryParam[]) {
    this.queryParamsValue = queryParams;
    return this;
  }

  jsonBody(objectBody: Object) {
    this.headers({ 'Content-Type': 'application/json' });
    this.body(JSON.stringify(objectBody));
    return this;
  }

  options(options: Partial<HttpOptions>) {
    Object.assign(this.optionValues, options);
    return this;
  }

  static buildQueryString(queryParams: HttpQueryParam[]) {
    if (queryParams.length > 0) {
      return `?${
        queryParams
          .map((param) => `${param[0]}=${encodeURIComponent(param[1])}`)
          .join('&')}`;
    }
    return '';
  }

  buildUrl() {
    return encodeURI(this.baseUrl + this.path) + HttpRequest.buildQueryString(this.queryParamsValue);
  }

  execute(): T {
    return this.httpClient(this);
  }
}
