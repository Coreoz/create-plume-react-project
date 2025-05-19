import { CreationDateOption } from '@lib/plume-admin-users/api/AdminUserTypes';

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
    close: string,
    search: string,
    add: string,
    authenticate: string,
    disconnect: string,
    display_more: string,
    keep_editing: string,
    close_without_saving: string,
  },
  // common labels
  label: {
    more_options: string,
    confirm_delete: string,
    creation_date: string,
    loading: string,
    empty: string,
  },
  // common messages
  message: {
    changes_saved: string,
    unsaved_data: string,
  },
  // navigation
  nav: {
    home: string,
    users: string,
    user_list: string,
    tasks: string,
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
    messages: {
      confirm_delete: (userName: string) => string,
    },
  },
  // pages users
  user: {
    title_list: string,
    title_create: string,
    title_edit: string,
    created: (date: string) => string,
    found: (count: number) => string,
    add_user: string,
    password_confirm: string,
    error_passwords_different: string,
  },
  // filters
  filters: {
    title: string,
    reset: string,
    user_creation_date: {
      title: string,
      options: Record<CreationDateOption, string>,
    },
    user_role: {
      title: string,
    },
  },
  // sorts
  sorts: {
    user: {
      user_name_asc: string,
      user_name_desc: string,
      creation_date_asc: string,
      creation_date_desc: string,
    },
  },
  // errors
  error: {
    field: {
      required: string,
      email_wrong_format: string,
      password_same_value: string,
      empty_field: string,
    },
    security: {
      fingerprint_missing: string,
    },
  },
  'http-errors': {
    INTERNAL_ERROR: string,
    NETWORK_ERROR: string,
    TIMEOUT_ERROR: string,
    FORBIDDEN_ERROR: string,
    WRONG_LOGIN_OR_PASSWORD: string,
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => string,
    FIELD_REQUIRED: (fieldName: string) => string,
    MESSAGE: (message: string) => string,
  },
  tasks: {
    pageTitle: string,
    listPanelTitle: string,
    statsPanelTitle: string,

    // Table headers
    columnName: string,
    columnFrequency: string,
    columnExecutions: string,
    columnNextExecution: string,
    columnLastStart: string,
    columnLastEnd: string,
    columnStatus: string,
    columnActions: string, // For buttons like Run/Delete

    // Task actions
    runTaskButton: string,
    deleteTaskButton: string,
    confirmDeleteTaskTitle: string,
    confirmDeleteTaskMessage: (taskName: string) => string,

    // Cell content / misc
    neverExecuted: string,
    executionDurationTooltip: (duration: number) => string,
    dateFormat: string, // For displaying dates
    // Example: specific status texts if needed, e.g. tasks.status.SUCCESS: string;

    // Stats
    statsActiveThreads: string,
    statsInactiveThreads: string,
    statsMinThreads: string,
    statsMaxThreads: string,
    statsLargestPool: string,

    // General actions that might be used on this page
    loading: string,
    errorFetching: string,
    noTasksFound: string,
    taskExecutedSuccess: string,
    taskDeletedSuccess: string,
  },
  common: {
    yes: string,
    no: string,
    cancel: string,
    confirm: string,
    delete: string,
    error: string,
  },
};
