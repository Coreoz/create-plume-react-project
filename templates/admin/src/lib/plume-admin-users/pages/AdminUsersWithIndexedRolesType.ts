import { AdminUserDetails } from '../api/AdminUserTypes';

export type AdminUsersWithIndexedRolesType = {
  users: AdminUserDetails[],
  roles: Map<string, string>,
};
