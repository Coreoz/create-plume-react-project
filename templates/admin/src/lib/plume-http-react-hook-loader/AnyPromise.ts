import { PromiseFunction } from 'simple-http-rest-client';

/**
 * Any Promise-like (compatible with regular Promise) that provides then and catch method for errors.
 */
export type AnyPromise<T, E = unknown> = {
  then: <R = void>(thenFunction: PromiseFunction<T, R>) => AnyPromise<R, E>,
  catch: <R = void>(catchFunction: PromiseFunction<E, R>) => AnyPromise<R | T, E>,
};
