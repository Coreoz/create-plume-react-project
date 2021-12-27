import { Logger } from 'simple-logging-system';
import { genericError, HttpPlumeError, HttpPlumeResponse } from '../client/PlumeHttpResponse';

const logger = new Logger('PlumeHttpPromise');

/**
 * A function that takes a parameter of type `P` and returns a result of type `R`
 */
export interface PromiseFunction<P, R> {
  (parameter: P): R;
}

export function httpErrorHandler<T>(httpResponse: HttpPlumeResponse<T>): T {
  if (httpResponse.error !== undefined) {
    // We actually want to through an object literal and not and `Error`
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw httpResponse.error;
  }
  if (httpResponse.response === undefined) {
    logger.error('Weird, the http result is not recognized');
    // We actually want to through an object literal and not and `Error`
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw genericError;
  }
  return httpResponse.response;
}

/**
 * Convert a `Promise<HttpPlumeResponse<T>>` to a `Promise<T>`.
 *
 * In case an HTTP error is returned by `HttpPlumeResponse<T>`, a rejected `Promise` is issued
 * with the error object {@link HttpPlumeError}
 * @param httpPromise The `Promise` to be unwrapped
 */
export function unwrapHttpPromise<T>(httpPromise: Promise<HttpPlumeResponse<T>>): Promise<T> {
  return httpPromise.then(httpErrorHandler);
}

export function safeThen<P, R>(thenFunction: PromiseFunction<P, R>, debugContext?: object): PromiseFunction<P, R> {
  return (parameter: P) => {
    try {
      return thenFunction(parameter);
    } catch (e) {
      logger.error('Error applying then function', { debugContext, parameter }, e);
      // We actually want to through an object literal and not and `Error`
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw genericError;
    }
  };
}

export function safeCatch<R>(catchFunction: PromiseFunction<HttpPlumeError, R>, debugContext?: object)
  : PromiseFunction<unknown, R> {
  return (httpError: unknown) => {
    if (httpError && typeof httpError === 'object' && (httpError as HttpPlumeError).errorCode !== undefined) {
      try {
        return catchFunction(httpError as HttpPlumeError);
      } catch (e) {
        logger.error('Error applying catch function', { debugContext, httpError }, e);
        // We actually want to through an object literal and not and `Error`
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw genericError;
      }
    }
    logger.error('Error thrown is not an httpError', { debugContext, httpError });
    // We actually want to through an object literal and not and `Error`
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw genericError;
  };
}

/**
 * A mutable safe `Promise` that ensures:
 * - Either a then function is provided or either an info log statement will be issued
 * - Either a catch function is provided or either a warning log statement will be issued
 * - Then and Catch functions are wrapped to ensure that if an error occurs during the execution,
 * an error statement is issued
 */
export default class PlumeHttpPromise<T> {
  private isThenAttached: boolean;

  private isCaughtAttached: boolean;

  // protected visibility for testing purpose only
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected promise: Promise<any>;

  constructor(basePromise: Promise<T>, private readonly debugContext?: object) {
    this.isThenAttached = false;
    this.isCaughtAttached = false;
    this.promise = basePromise;
    setTimeout(() => {
      if (!this.isThenAttached) {
        this.promise.then((response) => {
          logger.info('Ignored HTTP result', { debugContext, response });
        });
      }
      this.promise.catch((httpError) => {
        if (this.isCaughtAttached) {
          logger.debug('Caught HTTP error', { debugContext, httpError });
        } else {
          logger.warn('Ignored HTTP error', { debugContext, httpError });
        }
      });
    }, 0);
  }

  then<R = T>(thenFunction: PromiseFunction<T, R>): PlumeHttpPromise<R> {
    this.isThenAttached = true;
    this.promise = this.promise.then(safeThen(thenFunction));
    return this as unknown as PlumeHttpPromise<R>;
  }

  catch<R = T>(catchFunction: PromiseFunction<HttpPlumeError, R>): PlumeHttpPromise<R> {
    this.isCaughtAttached = true;
    this.promise = this.promise.catch(safeCatch(catchFunction));
    return this as unknown as PlumeHttpPromise<R>;
  }

  /**
   * Returns the corresponding raw `Promise`.
   *
   * - Either this should be called after {@link then} and {@link catch} functions are attached
   * - Either then are catch functions should be attached to the returned `Promise`. Usage of {@link safeThen}
   * and {@link safeCatch} is recommended for that
   */
  toPromise(): Promise<T> {
    // When manipulating the raw promise, we cannot keep track of then() and catch() methods being called
    this.isThenAttached = true;
    this.isCaughtAttached = true;
    return this.promise;
  }
}
