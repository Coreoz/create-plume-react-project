import { FilterElementProps } from '../../plume-admin-theme/layout/LayoutProps';
import { AdminUserDetails } from '../api/AdminUserTypes';

export const NAME: FilterElementProps<AdminUserDetails> = {
  filterKey: 'name',
  keyExtractor: (user: AdminUserDetails) => user.lastName,
};

export const ROLE = (roles: Map<string, string>): FilterElementProps<AdminUserDetails> => ({
  filterKey: 'role',
  keyExtractor: (user: AdminUserDetails) => roles.get(user.idRole) || '',
});
