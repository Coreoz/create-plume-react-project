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
