export interface ErrorFunction {
  (...args: string[]): string,
}

export type Translations = {
  app: {
    name: string,
  },
  // actions
  action: {
    back: string,
    cancel: string,
    save: string,
    delete: string,
    search: string,
    add: string,
    authenticate: string,
    disconnect: string,
    keep_editing: string,
    close_without_saving: string,
  },
  // common labels
  label: {
    creation_date: string,
    loading: string,
  },
  // common messages
  message: {
    changes_saved: string,
    unsaved_data: string,
    confirm_delete: string,
  },
  // navigation
  nav: {
    home: string,
    users: string,
    user_list: string,
  },
  // home
  home: {
    title: string,
  },
  login: {
    title: string,
  },
  // users
  users: {
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
  },
  // pages users
  user: {
    title_list: string,
    title_create: string,
    title_edit: string,
    password_confirm: string,
    error_passwords_different: string,
  },
  // errors
  error: {
    field : {
      required: string,
      email_wrong_format: string,
    },
  },
  'http-errors': {
    INTERNAL_ERROR: string,
    NETWORK_ERROR: string,
    TIMEOUT_ERROR: string,
    FORBIDDEN_ERROR: string,
    WRONG_LOGIN_OR_PASSWORD: string,
    TOO_MANY_WRONG_ATTEMPTS: (seconds: string) => string,
    FIELD_REQUIRED: (fieldName: string) => string,
    MESSAGE: (message: string) => string,
  },
};
