import { Logger } from 'simple-logging-system';
import { genericError, HttpPlumeError, HttpPlumeResponse } from '../client/PlumeHttpResponse';

const logger = new Logger('PlumeHttpPromise');

/**
 * A function that takes a parameter of type `P` and returns a result of type `R`
 */
export interface PromiseFunction<P, R> {
  (parameter: P): R;
}

/**
 * Process a {@link HttpPlumeResponse} to throw the {@link HttpPlumeResponse.error} if it exists.
 *
 * Should be called in the {@link Promise.then} of a `Promise<HttpPlumeResponse<T>>`
 * to convert it to a `Promise<T>`.
 *
 * For common usage, {@link unwrapHttpPromise} should be preferred as it deals better with TS types.
 * @param httpResponse The response to be processed.
 */
export function processHttpResponse<T>(httpResponse: HttpPlumeResponse<T>): T {
  if (httpResponse.error !== undefined) {
    // We actually want to throw an object literal and not and `Error`
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw httpResponse.error;
  }
  if (httpResponse.response === undefined) {
    logger.error('Weird, the http result is not recognized');
    // We actually want to throw an object literal and not and `Error`
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
  return httpPromise.then(processHttpResponse);
}

/**
 * Verify is an object seems to be a {@link HttpPlumeError}.
 *
 * Returns `true` if the object seems to be a {@link HttpPlumeError}, else `false`.
 */
export function isHttpPlumeError(object: unknown) {
  return object && typeof object === 'object' && (object as HttpPlumeError).errorCode !== undefined;
}

export function safeThen<P, R>(thenFunction: PromiseFunction<P, R>, debugContext?: object): PromiseFunction<P, R> {
  return (parameter: P) => {
    try {
      return thenFunction(parameter);
    } catch (error) {
      if (isHttpPlumeError(error)) {
        // If the then function has thrown a HttpPlumeError object, we assume this is legitimate
        throw error;
      }
      logger.error('Error applying then function', { debugContext, parameter }, error);
      // We actually want to through an object literal and not and `Error`
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw genericError;
    }
  };
}

export function safeCatch<R>(catchFunction: PromiseFunction<HttpPlumeError, R>, debugContext?: object)
  : PromiseFunction<unknown, R> {
  return (httpError: unknown) => {
    if (isHttpPlumeError(httpError)) {
      try {
        return catchFunction(httpError as HttpPlumeError);
      } catch (error) {
        if (isHttpPlumeError(error)) {
          // If the catch function has thrown a HttpPlumeError object, we assume this is legitimate
          throw error;
        }
        logger.error('Error applying catch function', { debugContext, httpError }, error);
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
 *
 * It also contains a `debugContext` that is used for logging in case an error occurs.
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

  /**
   * Execute a function after the `Promise` has been resolved.
   *
   * The function can:
   * - Just execute some code using the result
   * - Transform the result into another object
   * - Throw an error of type {@link HttpPlumeError} that will trigger the catch function
   *
   * If the {@link thenFunction} throws an error:
   * - The error will be caught and logged
   * - A {@link genericError} will be thrown
   *
   * The then function returns the `this` instance of {@link PlumeHttpPromise} containing and updating `Promise`.
   * If {@link thenFunction} has no return statement, a `PlumeHttpPromise<void>` will be returned,
   * else a `PlumeHttpPromise` parametrized with the returned type will be returned.
   *
   * @param thenFunction The code that will be executed after the `Promise` has been resolved.
   */
  then<R = void>(thenFunction: PromiseFunction<T, R>): PlumeHttpPromise<R> {
    this.isThenAttached = true;
    this.promise = this.promise.then(safeThen(thenFunction));
    return this as unknown as PlumeHttpPromise<R>;
  }

  /**
   * Execute a function after an error has happened resolving the `Promise` or executing {@link then} functions.
   *
   * This `catch` method should be called after all {@link then} functions has been called,
   * else it might not catch errors that have arisen from the {@link then} functions execution.
   *
   * This `catch` method may however be called before some {@link then} functions to provide a recovery feature.
   * It is the same as with a classic `Promise`, if something is returned from the {@link catchFunction},
   * then the promise is considered as recovered and the next {@link then} calls will be executed.
   *
   * If the {@link catchFunction} throws an error:
   * - The error will be caught and logged
   * - A {@link genericError} will be thrown
   *
   * @param catchFunction The code that will do something with the {@link HttpPlumeError}
   * and possibility recover the `Promise`.
   */
  catch<R = void>(catchFunction: PromiseFunction<HttpPlumeError, R>): PlumeHttpPromise<R | T> {
    this.isCaughtAttached = true;
    this.promise = this.promise.catch(safeCatch(catchFunction));
    return this as unknown as PlumeHttpPromise<R>;
  }

  /**
   * Returns the corresponding raw `Promise`.
   *
   * Once the {@link toPromise} method is called, verifications that {@link then} and {@link catch}
   * functions are attached are not made anymore. So:
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

  /**
   * Returns the debug context if it exists.
   *
   * This should be used only to make copies to the {@link PlumeHttpPromise}.
   */
  getDebugContext(): object | undefined {
    return this.debugContext;
  }
}
