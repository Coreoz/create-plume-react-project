import SampleApi from '../../api/session/SampleApi';

/**
 * A sample Service that can be copied.
 * After it has been copied, this file should be deleted :)
 */
export default class SampleService {
  constructor(private readonly sampleApi: SampleApi) {
  }

  sayHello(name: string) {
    return this.sampleApi.sample(name);
  }
}
