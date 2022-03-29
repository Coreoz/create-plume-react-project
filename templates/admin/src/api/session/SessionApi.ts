import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type SessionCredentials = {
  userName: string,
  password: string,
};

export type SessionToken = {
  webSessionToken: string,
  refreshDurationInMillis: number,
  inactiveDurationInMillis: number,
};

export default class SessionApi {
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  authenticate(credentials: SessionCredentials) {
    return this
      .httpClient
      .restRequest<SessionToken>(HttpMethod.POST, '/admin/session')
      .jsonBody(credentials)
      .execute();
  }

  refresh(webSessionToken: string) {
    return this
      .httpClient
      .restRequest<SessionToken>(HttpMethod.PUT, '/admin/session')
      .body(webSessionToken)
      .execute();
  }
}
