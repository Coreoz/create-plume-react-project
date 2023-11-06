import { AdminUserParameters } from '../api/AdminUserTypes';
import UserApi from '../api/UserApi';

export default class UserService {
  constructor(private readonly userApi: UserApi) {
  }

  fetchAll() {
    return this.userApi.fetchAll();
  }

  save(user: AdminUserParameters) {
    return this.userApi.save(user);
  }

  delete(idUser: string) {
    return this.userApi.delete(idUser);
  }

  public static userTrigramFromFullName(fullName?: string): string {
    if (!fullName) {
      return '';
    }
    const firstName: string = fullName.substring(0, fullName.indexOf(' ')) ?? '';
    const lastName: string = fullName.substring(fullName.indexOf(' ') + 1) ?? '';

    return UserService.userTrigram(firstName, lastName);
  }

  public static userTrigram(firstName: string, lastName: string): string {
    const firstNameParts = firstName.split('-');
    const firstNameAbbreviation = firstNameParts.map((part: string) => part.charAt(0)).join('');

    const lastNameParts = lastName.split(/\s+|'/);
    const lastNameAbbreviation = lastNameParts.map((part: string) => part).join('');

    return firstNameAbbreviation
      .concat(lastNameAbbreviation)
      .substring(0, 3)
      .toUpperCase();
  }

}
