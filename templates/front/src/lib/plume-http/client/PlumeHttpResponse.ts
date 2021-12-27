/**
 * Represents a HTTP error with a code and optional arguments
 */
export type HttpPlumeError = {
  errorCode: string,
  statusArguments?: string[],
};

export type HttpPlumeResponse<T> = {
  error?: HttpPlumeError,
  response?: T,
};

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
