import { SortElementProps } from '../../plume-admin-theme/list/sort/SortProps';
import { AdminUserDetails } from '../api/AdminUserTypes';
import { createCompareSorting } from '../../../components/theme/utils/SortUtils';

export const NAME_DESC: SortElementProps = {
  sortKey: 'NAME_DESC',
  sortFunction: createCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.lastName,
    false,
  ),
};

export const NAME_ASC: SortElementProps = {
  sortKey: 'NAME_ASC',
  sortFunction: createCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.lastName,
    true,
  ),
};

export default function userSortsList() {
  return [NAME_ASC, NAME_DESC];
}
