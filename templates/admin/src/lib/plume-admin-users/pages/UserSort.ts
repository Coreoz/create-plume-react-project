import dayjs from 'dayjs';
import { SortElementProps } from '../../plume-admin-theme/list/sort/SortProps';
import { AdminUserDetails } from '../api/AdminUserTypes';
import {
  createCustomCompareSorting,
  createLocaleCompareSorting,
} from '../../../components/theme/utils/SortUtils';

export const NAME_DESC: SortElementProps = {
  sortKey: 'NAME_DESC',
  sortFunction: createLocaleCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.lastName,
    false,
  ),
};

export const NAME_ASC: SortElementProps = {
  sortKey: 'NAME_ASC',
  sortFunction: createLocaleCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.lastName,
    true,
  ),
};

export const CREATION_DATE_ASC: SortElementProps = {
  sortKey: 'CREATION_DATE_ASC',
  sortFunction: createCustomCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.creationDate,
    true,
    (dateA, dateB) => dayjs(dateA).diff(dateB),
  ),
};

export const CREATION_DATE_DESC: SortElementProps = {
  sortKey: 'CREATION_DATE_DESC',
  sortFunction: createCustomCompareSorting<AdminUserDetails>(
    (o: AdminUserDetails) => o.creationDate,
    false,
    (dateA, dateB) => dayjs(dateA).diff(dateB),
  ),
};

export default function userSortsList() {
  return [NAME_ASC, NAME_DESC, CREATION_DATE_ASC, CREATION_DATE_DESC];
}
