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

function userFiltersList(roles?: Map<string, string>): FilterElementProps<AdminUserDetails>[] {
  if (!roles) {
    return [NAME];
  }
  return [NAME, ROLE(roles)];
}

export default function userFilters(roles?: Map<string, string>): { [key: string]: FilterElementProps<AdminUserDetails> } {
  return Object.fromEntries(
    new Map<string, FilterElementProps<AdminUserDetails>>(
      userFiltersList(roles).map(
        (filterPossibility) => [filterPossibility.filterKey, filterPossibility]
      )
    )
  );
}
