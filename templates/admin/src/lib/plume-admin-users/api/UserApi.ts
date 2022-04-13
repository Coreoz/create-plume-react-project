import { HttpMethod } from 'simple-http-request-builder';
import { AdminUserDetails, AdminUserParameters, AdminUsersDetails } from './AdminUserTypes';
import PlumeAdminHttpClient from '../../plume-admin-api/PlumeHttpClient';

export default class UserApi {
  constructor(private readonly httpClient: PlumeAdminHttpClient) {
  }

  fetchAll() {
    return this
      .httpClient
      .restRequest<AdminUsersDetails>(HttpMethod.GET, '/admin/users')
      .execute();
  }

  save(user: AdminUserParameters) {
    return this
      .httpClient
      .restRequest<AdminUserDetails | undefined>(user.id ? HttpMethod.PUT : HttpMethod.POST, '/admin/users')
      .jsonBody(user)
      .execute();
  }

  delete(idUser: string) {
    return this
      .httpClient
      .restRequest<undefined>(HttpMethod.DELETE, `/admin/users/${idUser}`)
      .execute();
  }
}
