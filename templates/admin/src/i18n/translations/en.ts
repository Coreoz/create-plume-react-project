import { Translations } from './Translations';

const enMessages: Translations = {
  app: {
    name: 'Plume admin',
  },
  // actions
  action: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    add: 'Add',
    authenticate: 'Log in',
    disconnect: 'Log out',
    keep_editing: 'Keep editing',
    close_without_saving: 'Close without saving',
  },
  // common labels
  label: {
    creation_date: 'Creation date',
    loading: 'Loading...',
  },
  // common messages
  message: {
    changes_saved: 'Changes have been successfully saved',
    unsaved_data: 'There are unsaved changes. '
      + 'If you would like to save changes, press the "Keep editing" button',
    confirm_delete: 'To confirm the deleting, press the "Delete" button',
  },
  // navigation
  nav: {
    home: 'Home',
    users: 'User management',
    user_list: 'Users',
  },
  // home
  home: {
    title: 'Home page',
  },
  login: {
    title: 'Please authenticate',
  },
  // users
  users: {
    userName: 'User name',
    password: 'Password',
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    role: 'Role',
  },
  // pages users
  user: {
    title_list: 'Users list',
    title_create: 'User creation',
    title_edit: 'User modification',
    password_confirm: 'Password confirmation',
    error_passwords_different: 'Password do not match its confirmation',
  },
  // errors
  error: {
    field: {
      required: 'Field is required',
      email_wrong_format: 'The input email address is invalid',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'An unexpected error occurred',
    NETWORK_ERROR: 'Network error, your internet connexion seems unavailable',
    TIMEOUT_ERROR: 'Network error (timeout), your internet connection or the remote server seem unavailable',
    FORBIDDEN_ERROR: 'It seems you do not have access to this resource or this action',
    WRONG_LOGIN_OR_PASSWORD: 'User name or password incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPTS: (seconds: string) => `Due to login attempt errors, your account is locked for ${seconds} seconds, please try again later`,
    FIELD_REQUIRED: (fieldName: string) => `Field '${fieldName}' is required`,
    MESSAGE: (message: string) => message,
  },
} as const;

export default enMessages;
