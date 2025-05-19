/* eslint-disable @stylistic/max-len */
import { viteHotContext } from '@i18n/translations/hmr-config';
import { observable, WritableObservable } from 'micro-observables';
import { Translations } from './Translations';
import translationHotReload from './translations-hmr';

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
    close: 'Close',
    search: 'Search',
    add: 'Add',
    authenticate: 'Log in',
    disconnect: 'Log out',
    display_more: 'Display more',
    keep_editing: 'Keep editing',
    close_without_saving: 'Close without saving',
  },
  // common labels
  label: {
    more_options: 'More options',
    confirm_delete: 'Confirm deletion',
    creation_date: 'Creation date',
    loading: 'Loading...',
    empty: 'No element',
  },
  // common messages
  message: {
    changes_saved: 'Changes have been successfully saved',
    unsaved_data: 'There are unsaved changes. '
      + 'If you would like to save changes, press the "Keep editing" button',
  },
  // navigation
  nav: {
    home: 'Home',
    users: 'User management',
    user_list: 'Users',
    tasks: 'Scheduled Tasks',
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
    messages: {
      confirm_delete: (userName: string) => `You are about to delete ${userName}. This action is irreversible.`,
    },
  },
  // pages users
  user: {
    title_list: 'Users list',
    title_create: 'User creation',
    title_edit: 'User modification',
    created: (date: string) => `Created on ${date}`,
    found: (count: number) => `${count} user${count > 1 ? 's' : ''} found`,
    add_user: 'Add user',
    password_confirm: 'Password confirmation',
    error_passwords_different: 'Password do not match its confirmation',
  },
  // filters
  filters: {
    title: 'Filters',
    reset: 'Reset filters',
    user_creation_date: {
      title: 'Creation date',
      options: {
        less_than_15_days: 'Less than 15 days',
        between_15_45_days: 'Between 15 and 45 days',
        more_than_45_days: 'More than 45 days',
      },
    },
    user_role: {
      title: 'Role',
    },
  },
  // sorts
  sorts: {
    user: {
      user_name_asc: 'Sort username (A to Z)',
      user_name_desc: 'Sort username (Z to A)',
      creation_date_asc: 'Sort creation date (oldest first)',
      creation_date_desc: 'Sort creation date (most recent first)',
    },
  },
  // errors
  error: {
    field: {
      required: 'Field is required',
      email_wrong_format: 'The input email address is invalid',
      password_same_value: 'Both passwords must be the same',
      empty_field: 'The field entered is empty',
    },
    security: {
      fingerprint_missing: 'The fingerprint cookie to secure the JWT token seems to be missing. This may be ok in development, but in production, this cookie must be activated',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'An unexpected error occurred',
    NETWORK_ERROR: 'Network error, your internet connexion seems unavailable',
    TIMEOUT_ERROR: 'Network error (timeout), your internet connection or the remote server seem unavailable',
    FORBIDDEN_ERROR: 'It seems you do not have access to this resource or this action',
    WRONG_LOGIN_OR_PASSWORD: 'User name or password incorrect',
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Due to login attempt errors, your account is locked for ${seconds} seconds, please try again later`,
    FIELD_REQUIRED: (fieldName: string) => `Field '${fieldName}' is required`,
    MESSAGE: (message: string) => message,
  },
  tasks: {
    pageTitle: 'Scheduled Tasks',
    listPanelTitle: 'Scheduled Tasks List',
    statsPanelTitle: 'Thread Statistics',

    columnName: 'Task Name',
    columnFrequency: 'Frequency',
    columnExecutions: 'Executions',
    columnNextExecution: 'Next Execution',
    columnLastStart: 'Last Start',
    columnLastEnd: 'Last End',
    columnStatus: 'Status',
    columnActions: 'Actions',

    runTaskButton: 'Run',
    deleteTaskButton: 'Delete',
    confirmDeleteTaskTitle: 'Confirm Deletion',
    confirmDeleteTaskMessage: (taskName: string) => `Are you sure you want to delete the task \'${taskName}\'?`,

    neverExecuted: 'Never executed',
    executionDurationTooltip: (duration: number) => `Execution time: ${duration} ms`,
    dateFormat: 'YYYY-MM-DD HH:mm:ss',

    statsActiveThreads: 'Active threads:',
    statsInactiveThreads: 'Inactive threads:',
    statsMinThreads: 'Minimum threads:',
    statsMaxThreads: 'Maximum threads:',
    statsLargestPool: 'Largest pool size:',

    loading: 'Loading...',
    errorFetching: 'Error fetching task data.',
    noTasksFound: 'No scheduled tasks at the moment.',
    taskExecutedSuccess: 'Task executed successfully.',
    taskDeletedSuccess: 'Task deleted successfully.',
  },
  common: {
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    error: 'Error',
  },
} as const;

const enMessagesObservable: WritableObservable<Translations> = observable(enMessages);

if (viteHotContext?.hot) {
  // Hot reloading, see translations-hmr.ts
  viteHotContext.hot.accept(translationHotReload(enMessagesObservable));
}

export default enMessagesObservable.readOnly();
