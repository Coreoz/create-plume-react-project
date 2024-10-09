import {
  AdminUserDetails, CreationDateOption, UserSearch, UserSort,
} from '@lib/plume-admin-users/api/AdminUserTypes';
import filterFunctions from '@lib/plume-search/filters/FilterFunctions';
import sortFunctions from '@lib/plume-search/sorts/SortFunctions';
import dayjs, { Dayjs } from 'dayjs';

const filterLastLoginDateFromOption = (value: AdminUserDetails, option: CreationDateOption | undefined) => {
  const daysDifferenceBetweenCreationAndToday: number = dayjs()
    .diff(dayjs(value.creationDate), 'day');
  if (option === CreationDateOption.MORE_THAN_45_DAYS) {
    return daysDifferenceBetweenCreationAndToday > 45;
  }
  if (option === CreationDateOption.LESS_THAN_15_DAYS) {
    return daysDifferenceBetweenCreationAndToday < 15;
  }
  if (option === CreationDateOption.BETWEEN_15_45_DAYS) {
    return !(daysDifferenceBetweenCreationAndToday < 15 || daysDifferenceBetweenCreationAndToday > 45);
  }
  return true;
};

export const isUserDisplayed = (user: AdminUserDetails, filter: Partial<UserSearch>) => (
  (
    filterFunctions.includesStringInsensitive(user.userName, filter.text ?? '')
    || filterFunctions.includesStringInsensitive(user.firstName, filter.text ?? '')
    || filterFunctions.includesStringInsensitive(user.lastName, filter.text ?? '')
    || filterFunctions.includesStringInsensitive(user.email, filter.text ?? '')
  )
  && filterLastLoginDateFromOption(user, filter.creationDate)
  && filterFunctions.nonEmptyArrayIncludes(user.idRole, filter.roles ?? [])
);

export const sortUser: Record<UserSort, (
  value: AdminUserDetails,
  compared: AdminUserDetails,
  isDesc: boolean,
) => number> = {
  [UserSort.USER_NAME]: (value: AdminUserDetails, compared: AdminUserDetails, isDesc: boolean) => (
    sortFunctions.withSortDirection<string>(sortFunctions.text, isDesc)(
      value.userName,
      compared.userName,
    )
  ),
  [UserSort.CREATION_DATE]: (value: AdminUserDetails, compared: AdminUserDetails, isDesc: boolean) => (
    sortFunctions.withSortDirection<Dayjs>(sortFunctions.datetime, isDesc)(
      dayjs(value.creationDate),
      dayjs(compared.creationDate),
    )
  ),
};
