import { Logger } from 'simple-logging-system';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import {
  forbiddenError, genericError, HttpPlumeError, HttpPlumeResponse, networkError, timeoutError,
} from './PlumeHttpResponse';

const logger = new Logger('PlumeHttpClientHelpers');

export default class PlumeHttpClientHelpers {
  static execute(httpRequest: HttpRequest<unknown>): Promise<Response> {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), httpRequest.optionValues.timeoutInMillis);
    return fetch(
      httpRequest.buildUrl(),
      {
        headers: httpRequest.headersValue,
        method: httpRequest.method,
        body: httpRequest.bodyValue,
        credentials: 'same-origin',
        signal: controller.signal,
      },
    )
      .finally(() => clearTimeout(timeoutHandle));
  }

  static executeRest<T>(httpRequest: HttpRequest<unknown>) {
    return <Promise<HttpPlumeResponse<T>>> PlumeHttpClientHelpers
      .execute(httpRequest)
      .then(PlumeHttpClientHelpers.serverErrorHandler)
      .catch(PlumeHttpClientHelpers.networkErrorCatcher);
  }

  static networkErrorCatcher<T>(error: Error): HttpPlumeResponse<T> {
    if (error.name === 'AbortError') {
      return {
        error: timeoutError,
      };
    }
    logger.error('Cannot connect to HTTP server due to a network error', error);
    return {
      error: networkError,
    };
  }

  static errorPromiseResponse<T>(error: HttpPlumeError): Promise<HttpPlumeResponse<T>> {
    return Promise.resolve<HttpPlumeResponse<T>>({
      error,
    });
  }

  static serverErrorHandler<T>(response: Response): Promise<HttpPlumeResponse<T>> {
    // if the error is a forbidden access, the body should be empty
    if (response.status === 403) {
      logger.warn('Forbidden access', response);
      return PlumeHttpClientHelpers.errorPromiseResponse(forbiddenError);
    }

    // if there is no content, there is no need to try to parse it
    if (response.status === 204) {
      return Promise.resolve<HttpPlumeResponse<T>>({ response: null as unknown as T });
    }

    // make sure the response is a JSON one
    const contentType = response.headers.get('content-type');
    if (contentType === null || contentType.indexOf('application/json') === -1) {
      logger.error('Response type is not JSON', response);
      return PlumeHttpClientHelpers.errorPromiseResponse(genericError);
    }

    return response
      .json()
      .then((json) => {
        if (response.ok) {
          return {
            response: json,
          };
        }
        if (typeof json.errorCode === 'undefined') {
          logger.error('Unrecognized JSON error', response);
          return {
            error: genericError,
          };
        }
        return {
          error: json,
        };
      })
      .catch((error) => {
        logger.error('Cannot parse JSON', error);
        return {
          error: genericError,
        };
      });
  }
}
