export interface ErrorFunction {
  (...args: string[]): string;
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
    update: string,
    authenticate: string,
    disconnect: string,
    keep_editing: string,
    close_without_saving: string,
    retry: string,
  },
  // common labels
  label: {
    creation_date: string,
    loading: string,
    empty: string,
    more_options: string,
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
    add: string,
    password_confirm: string,
    error_passwords_different: string,
    list: {
      count: (count: number) => string,
    },
  },
  // sorts wording
  sort: {
    user: {
      fullName_desc: string,
      fullName_asc: string,
      creationDate_asc: string,
      creationDate_desc: string,
    },
  },
  // filters wording
  filter: {
    user: {
      title: string,
      name: string,
      role: string,
      fullName: string,
      userName: string,
      email: string,
      creationDate: string,
    },
  },
  selected: (count: number) => string,
  // errors
  error: {
    field: {
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
