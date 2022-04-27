import { ObjectFilterProps } from '../../plume-admin-theme/list/filter/FilterProps';
import { AdminUserDetails } from '../api/AdminUserTypes';

export const NAME: ObjectFilterProps<AdminUserDetails> = {
  filterKey: 'name',
  keyExtractor: (user: AdminUserDetails) => user.lastName,
};

export const ROLE = (roles: Map<string, string>): ObjectFilterProps<AdminUserDetails> => ({
  filterKey: 'role',
  keyExtractor: (user: AdminUserDetails) => roles.get(user.idRole) || '',
});

export default function userFilters(roles?: Map<string, string>): ObjectFilterProps<AdminUserDetails>[] {
  if (!roles) {
    return [NAME];
  }
  return [NAME, ROLE(roles)];
}
