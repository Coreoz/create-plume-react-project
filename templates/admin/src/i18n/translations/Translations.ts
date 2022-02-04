export interface ErrorFunction {
  (...args: string[]): string;
}

export type Translations = {
  // actions
  'action.back': string,
  'action.cancel': string,
  'action.save': string,
  'action.delete': string,
  'action.search': string,
  'action.add': string,
  'action.update': string,
  'action.authenticate': string,
  'action.disconnect': string,
  'action.google.authenticate': string
  'action.apple.authenticate': string
  'action.keep-editing': string,
  'action.close-without-saving': string,
  // common labels
  'label.creation-date': string,
  'label.loading': string,
  'label.empty': string,
  // common messages
  'message.changes-saved': string,
  'message.unsaved-data': string,
  'message.confirm-delete': string,
  // navigation
  'app.name': string,
  'app.baseline': string,
  'nav.home': string,
  'nav.users': string,
  'nav.user-list': string,
  // home
  'home.title': string,
  // login
  'login.title': string,
  'login.actions.forgot': string,
  // users
  'users.USERNAME': string,
  'users.PASSWORD': string,
  'users.PASSWORD_CONFIRM': string,
  'users.EMAIL': string,
  'users.FIRSTNAME': string,
  'users.LASTNAME': string,
  'users.ROLE': string,
  // pages users
  'user.title-list': string,
  'user.title-create': string,
  'user.title-edit': string,
  'user.error-passwords-different': string,
  'user.list.count': (count: number) => string,
  'user.sort.name_desc': string,
  'user.sort.name_asc': string,
  'user.filter.title': string,
  'user.filter.name': string,
  'user.filter.role': string,
  // sample with pluralization
  'clicks.count': (count: number) => string,
  // errors
  'error.field.required': string,
  'error.field.email-wrong-format': string,
  'http-errors': {
    'INTERNAL_ERROR': string,
    'NETWORK_ERROR': string,
    'TIMEOUT_ERROR': string,
    'FORBIDDEN_ERROR': string,
    'WRONG_LOGIN_OR_PASSWORD': string,
    'TOO_MANY_WRONG_ATTEMPS': (seconds: string) => string,
    'FIELD_REQUIRED': (fieldName: string) => string,
    'MESSAGE': (message: string) => string,
  },
};
