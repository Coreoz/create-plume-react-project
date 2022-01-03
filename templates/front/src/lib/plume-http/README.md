Plume HTTP Client
=================

This library provides classes and functions to simplify the HTTP exchanges with a REST and non-REST remote server.
This library focus mainly on HTTP calls that comply to a backend made with the
[Jersey module of Plume Framework](https://github.com/Coreoz/Plume/tree/master/plume-web-jersey).
It only means that HTTP errors (validation, general errors, etc.) should follow a format:
```typescript
export type HttpPlumeError = {
  /**
   * A code that enables to identify the error, for example `INTERNAL_ERROR` or `FORBIDDEN_ERROR`.
   */
  errorCode: string,
  /**
   * Optional error arguments that enable frontends to display more information about the error.
   * For example after too many authentication attempts, a backend can return the error:
   * `{errorCode: 'TOO_MANY_WRONG_ATTEMPTS', statusArguments: [180]}`,
   * so frontend can display the error: Too many login attempts have failed the last 5 minutes,
   * login is blocked for 180 seconds for this account.
   */
  statusArguments?: string[],
};
```

This library is used by default in the project templates provided by
[Create Plume React Project](https://github.com/Coreoz/create-plume-react-project).
Basic usage of the library can be found in:
- The API client declaration: <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/ApiHttpClient.ts>
- An API client usage (here authentication): <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/session/SessionApi.ts>
