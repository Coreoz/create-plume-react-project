import { CreationDateOption } from '@lib/plume-admin-users/pages/UsersList';

export type AdminUserDetails = {
  id: string,
  idRole: string,
  creationDate: string,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
};

export type AdminRole = {
  id: string,
  label: string,
};

export type AdminUsersDetails = {
  users: AdminUserDetails[],
  roles: AdminRole[],
};

export type AdminUserParameters = {
  id?: string,
  idRole: string,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password?: string,
  passwordConfirmation?: string,
};

export type UserSearch = {
  text: string,
  creationDate: CreationDateOption,
  roles: string[],
};

export enum UserSort {
  USER_NAME = 'USER_NAME',
  CREATION_DATE = 'CREATION_DATE',
}
