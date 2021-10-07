import { Translations } from './Translations';

const enMessages: Translations = {
  // actions
  'action.back': 'Back',
  'action.cancel': 'Cancel',
  'action.save': 'Save',
  'action.delete': 'Delete',
  'action.search': 'Search',
  'action.add': 'Add',
  'action.authenticate': 'Log in',
  'action.disconnect': 'Log out',
  'action.keep-editing': 'Keep editing',
  'action.close-without-saving': 'Close without saving',
  // common labels
  'label.creation-date': 'Creation date',
  'label.loading': 'Loading...',
  // common messages
  'message.changes-saved': 'Changes have been successfully saved',
  'message.unsaved-data': 'There are unsaved changes. '
    + 'If you would like to save changes, press the "Keep editing" button',
  'message.confirm-delete': 'To confirm the deleting, press the "Delete" button',
  // navigation
  'app.name': 'Plume admin',
  'nav.home': 'Home',
  'nav.users': 'User management',
  'nav.user-list': 'Users',
  // home
  'home.title': 'Home page',
  'login.title': 'Please authenticate',
  // users
  'users.USERNAME': 'User name',
  'users.PASSWORD': 'Password',
  'users.PASSWORD_CONFIRM': 'Password confirmation',
  'users.EMAIL': 'Email',
  'users.FIRSTNAME': 'First name',
  'users.LASTNAME': 'Last name',
  'users.ROLE': 'Role',
  // pages users
  'user.title-list': 'Users list',
  'user.title-create': 'User creation',
  'user.title-edit': 'User modification',
  'user.error-passwords-different': 'Password do not match its confirmation',
  // sample with pluralization
  'clicks.count': (count: number) => `There is ${count} click${count > 1 ? 's' : ''} !`,
  // errors
  'error.field.required': 'Field is required',
  'error.field.email-wrong-format': 'The input email address is invalid',
  'http-errors': {
    INTERNAL_ERROR: 'An unexpected error occurred',
    NETWORK_ERROR: 'Network error, your internet connexion seems unavailable',
    TIMEOUT_ERROR: 'Network error (timeout), your internet connection or the remote server seem unavailable',
    FORBIDDEN_ERROR: 'It seems you do not have access to this resource or this action',
    WRONG_LOGIN_OR_PASSWORD: 'User name or password incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Due to login attempt errors, your account is locked for ${seconds} seconds, please try again later`,
    FIELD_REQUIRED: (fieldName: string) => `Field '${fieldName}' is required`,
    MESSAGE: (message: string) => message,
  },
} as const;

export default enMessages;
