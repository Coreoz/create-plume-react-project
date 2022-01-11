/**
 * Represents a HTTP error with a code and optional arguments
 */
export type HttpPlumeError = {
  /**
   * A code that enables to identify the error, for example `INTERNAL_ERROR` or `FORBIDDEN_ERROR`.
   */
  errorCode: string,
  /**
   * Optional error arguments that enable frontends to display more information about the error.
   * For example after too many authentication attempts, a backend can return the error:
   * `{errorCode: 'TOO_MANY_WRONG_ATTEMPTS', statusArguments: [180]}`,
   * so frontend can display the error: Too many login attempts have failed the last 5 minutes,
   * login is blocked for 180 seconds for this account.
   */
  statusArguments?: string[],
};

export type HttpPlumeResponse<T> = {
  error?: HttpPlumeError,
  response?: T,
};

export const makeErrorPromiseResponse = <T>(error: HttpPlumeError): Promise<HttpPlumeResponse<T>> => Promise
  .resolve<HttpPlumeResponse<T>>({ error });

/**
 * A generic error used to represent an unknown error in an execution.
 */
export const genericError = {
  errorCode: 'INTERNAL_ERROR',
};

export const networkError = {
  errorCode: 'NETWORK_ERROR',
};

export const timeoutError = {
  errorCode: 'TIMEOUT_ERROR',
};

export const forbiddenError = {
  errorCode: 'FORBIDDEN_ERROR',
};
