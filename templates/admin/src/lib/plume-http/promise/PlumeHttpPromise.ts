import { Logger } from 'simple-logging-system';
import { genericError, HttpPlumeError, HttpPlumeResponse } from '../client/PlumeHttpResponse';
import HttpRequest from '../../simple-http-request-builder/HttpRequest';

const logger = new Logger('PlumeHttpPromise');

export interface PlumeHttpPromiseConsumeOnly<T> {
  then(consumer: (result: T) => void): PlumeHttpPromiseConsumeOnly<T>;
  catch(consumer: (error: HttpPlumeError) => void): PlumeHttpPromiseConsumeOnly<T>;
}

export default class PlumeHttpPromise<T> implements PlumeHttpPromiseConsumeOnly<T> {
  private thenConsumer?: (result: T) => void = undefined;

  private catchConsumer?: (error: HttpPlumeError) => void = undefined;

  private isConsumedRaw: boolean;

  constructor(private readonly request: HttpRequest<unknown>, private readonly promise: Promise<HttpPlumeResponse<T>>) {
    this.isConsumedRaw = false;
    // setTimeout enables PlumeHttpPromise users to set their then and catch functions
    setTimeout(() => {
      if (this.isConsumedRaw) {
        return;
      }

      promise
        .then((result) => {
          if (result.error !== undefined) {
            if (this.catchConsumer !== undefined) {
              logger.info('Caught http error', { request, response: result });
              PlumeHttpPromise.executeCatchConsumer(request, result.error, this.catchConsumer);
            } else {
              logger.warn('Ignored http error', { request, response: result });
            }
          } else if (result.response !== undefined) {
            if (this.thenConsumer !== undefined) {
              try {
                this.thenConsumer(result.response);
              } catch (e) {
                logger.error('Error consuming http result', { request, response: result }, e);
              }
            } else {
              logger.info('Ignored http result', { request, response: result });
            }
          } else {
            logger.error('Weird, the http result is not recognized', { request, response: result });
            if (this.catchConsumer !== undefined) {
              PlumeHttpPromise.executeCatchConsumer(request, genericError, this.catchConsumer);
            }
          }
        })
        .catch((error) => logger.error('uncaught error catch by HttpPlumePromise', request, error));
    }, 0);
  }

  rawPromise() {
    if (this.thenConsumer !== undefined || this.catchConsumer !== undefined) {
      throw new Error('Trying to get the raw promise whereas consumers have already been defined');
    }
    this.isConsumedRaw = true;
    return this.promise;
  }

  then(consumer: (result: T) => void): PlumeHttpPromiseConsumeOnly<T> {
    this.thenConsumer = PlumeHttpPromise.toUniqueConsumer(consumer, this.thenConsumer);
    return this;
  }

  catch(consumer: (error: HttpPlumeError) => void): PlumeHttpPromiseConsumeOnly<T> {
    this.catchConsumer = PlumeHttpPromise.toUniqueConsumer(consumer, this.catchConsumer);
    return this;
  }

  private static executeCatchConsumer(
    request: HttpRequest<unknown>, error: HttpPlumeError, catchConsumer: (error: HttpPlumeError) => void,
  ) {
    try {
      catchConsumer(error);
    } catch (e) {
      logger.error('Error consuming http error', { request, error }, e);
    }
  }

  private static toUniqueConsumer<U>(
    newConsumer: (arg: U) => void,
    baseConsumer?: (arg: U) => void,
  ) {
    if (baseConsumer !== undefined) {
      return ((arg: U) => {
        baseConsumer(arg);
        newConsumer(arg);
      });
    }
    return newConsumer;
  }
}
