import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import PlumeAdminHttpClient from '../../plume-admin-api/PlumeHttpClient';
import {
  AdminUserDetails,
  AdminUserParameters,
  AdminUsersDetails,
} from './AdminUserTypes';

export default class UserApi {
  constructor(private readonly httpClient: PlumeAdminHttpClient) {
  }

  fetchAll(): HttpPromise<AdminUsersDetails> {
    return this
      .httpClient
      .restRequest<AdminUsersDetails>(HttpMethod.GET, '/admin/users')
      .execute();
  }

  save(user: AdminUserParameters): HttpPromise<AdminUserDetails | undefined> {
    return this.httpClient
      .restRequest<AdminUserDetails | undefined>(user.id ? HttpMethod.PUT : HttpMethod.POST, '/admin/users')
      .jsonBody(user)
      .execute();
  }

  delete(idUser: string): HttpPromise<undefined> {
    return this
      .httpClient
      .restRequest<undefined>(HttpMethod.DELETE, `/admin/users/${idUser}`)
      .execute();
  }
}
