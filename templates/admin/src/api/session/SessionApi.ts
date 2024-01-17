import { HttpMethod } from 'simple-http-request-builder';
import { RefreshableJwtToken } from 'browser-user-session';
import type { SessionRefresher } from 'browser-user-session';
import ApiHttpClient from '../ApiHttpClient';

export type SessionCredentials = {
  userName: string,
  password: string,
};

export default class SessionApi implements SessionRefresher {
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  authenticate(credentials: SessionCredentials) {
    return this
      .httpClient
      .restRequest<RefreshableJwtToken>(HttpMethod.POST, '/admin/session')
      .jsonBody(credentials)
      .execute();
  }

  refresh(webSessionToken: string) {
    return this
      .httpClient
      .restRequest<RefreshableJwtToken>(HttpMethod.PUT, '/admin/session')
      .body(webSessionToken)
      .execute();
  }
}
