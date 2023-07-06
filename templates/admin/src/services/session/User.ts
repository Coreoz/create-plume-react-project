export type User = {
  idUser: string,
  userName: string,
  fullName: string,
  permissions: string[],
};

export interface UserWithExpiration extends User {
  exp: number,
}
