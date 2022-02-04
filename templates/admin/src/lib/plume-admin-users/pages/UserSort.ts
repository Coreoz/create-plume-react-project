import { SortElementProps } from '../../plume-admin-theme/layout/LayoutProps';
import { AdminUserDetails } from '../api/AdminUserTypes';

export const NAME_DESC: SortElementProps = {
  sortKey: 'NAME_DESC',
  sortFunction: (a: AdminUserDetails, b: AdminUserDetails) => {
    if (a.lastName.localeCompare(b.lastName, 'fr', { ignorePunctuation: true }) === 0) {
      return b.lastName.localeCompare(a.lastName, 'fr', { ignorePunctuation: true });
    }
    return a.lastName.localeCompare(b.lastName, 'fr', { ignorePunctuation: true });
  }
}

export const NAME_ASC: SortElementProps = {
  sortKey: 'NAME_ASC',
  sortFunction: (a: AdminUserDetails, b: AdminUserDetails) => {
    if (a.lastName.localeCompare(b.lastName, 'fr', { ignorePunctuation: true }) === 0) {
      return a.lastName.localeCompare(b.lastName, 'fr', { ignorePunctuation: true });
    }
    return b.lastName.localeCompare(a.lastName, 'fr', { ignorePunctuation: true });
  }
}
