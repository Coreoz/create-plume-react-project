import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type Sample = {
  name: string,
};

/**
 * A sample API that can be copied to call real API.
 * After it has been copied, this file should be deleted :)
 */
export default class SampleApi {
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  sample(name: string) {
    return this
      .httpClient
      .restRequest<Sample>(HttpMethod.GET, `/example/test/${name}`)
      .execute();
  }
}
