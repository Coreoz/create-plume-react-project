User session
============
This module provides helpers to manage frontend user session.

Getting started
---------------
1. Create a backend API to create & renew JWT sessions. It can be inspired or referenced from [Plume Admin](https://github.com/Coreoz/Plume-admin): <https://github.com/Coreoz/Plume-admin/blob/master/plume-admin-ws/src/main/java/com/coreoz/plume/admin/webservices/SessionWs.java>. Make sure [OWASP considerations regarding JWT](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) are correctly implemented.
2. Create an API that implements the interface `SessionRefresher`. [See below for an example](#session-api-example).
3. Create the `User` type that matches the JWT and that will be used in the project. [See below for an example](#user-type-example).
4. A variant of the User type with the field `exp` can be optionally created in order to use a simpler `User` object through the project. [See below for an example](#user-type-with-expiration-example).
5. Create the `SessionService` that will be used by component that will interact with the user sessions. [See below for an example](#session-service-example).
6. Bind the services in the dependency injection system in the `services-module.ts` file. [See below for an example](#services-binding-example).
7. In `index.tsx` file, try to initialize the session at startup, and make sure local storage sessions are synchronized across different browser tabs [See below for an example](#project-startup-configuration-example).
6. Create some protected routes that will require a current user session. [See below for an example](#protected-routes-example).
7. Create a page that will authenticate users. [See below for an example](#login-page-example).

Session API example
-------------------
```typescript
export type SessionCredentials = {
  userName: string,
  password: string,
};

export default class SessionApi implements SessionRefresher {
  constructor(private readonly httpClient: ApiHttpClient) {
  }

  authenticate(credentials: SessionCredentials) {
    return this
      .httpClient
      .restRequest<RefreshableJwtToken>(HttpMethod.POST, '/admin/session')
      .jsonBody(credentials)
      .execute();
  }

  refresh(webSessionToken: string) {
    return this
      .httpClient
      .restRequest<RefreshableJwtToken>(HttpMethod.PUT, '/admin/session')
      .body(webSessionToken)
      .execute();
  }
}
```

User type example
-------------------
```typescript
export type User = {
  idUser: string,
  userName: string,
  fullName: string,
  permissions: string[],
};
```

User type with expiration example
----------------------------------
```typescript
export interface UserWithExpiration extends User {
  exp: number;
}
```

Session service example
-------------------
```typescript

const THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION = 60 * 1000; // 1 minutes
const LOCAL_STORAGE_CURRENT_SESSION = 'user-session';
const HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN = 'ALREADY_EXPIRED_SESSION_TOKEN';

export default class SessionService {
  private jwtSessionManager: JwtSessionManager<UserWithExpiration>;

  constructor(private readonly sessionApi: SessionApi,
    private readonly scheduler: Scheduler,
    private readonly pageActivityManager: PageActivityManager,
    private readonly idlenessDetector: IdlenessDetector) {
    this.jwtSessionManager = new JwtSessionManager<UserWithExpiration>(
      sessionApi,
      scheduler,
      pageActivityManager,
      idlenessDetector,
      {
        localStorageCurrentSession: LOCAL_STORAGE_CURRENT_SESSION,
        thresholdInMillisToDetectExpiredSession: THRESHOLD_IN_MILLIS_TO_DETECT_EXPIRED_SESSION,
        httpErrorAlreadyExpiredSessionToken: HTTP_ERROR_ALREADY_EXPIRED_SESSION_TOKEN,
      },
    );
  }

  // data access

  getSessionToken() {
    return this.jwtSessionManager.getSessionToken();
  }

  getCurrentUser() {
    return this.jwtSessionManager.getCurrentUser();
  }

  isAuthenticated() {
    return this.jwtSessionManager.isAuthenticated();
  }

  hasPermission(permission: Permission) {
    return this.jwtSessionManager.getCurrentUser().select((user) => user?.permissions.includes(permission) ?? false);
  }

  // actions

  authenticate(credentials: SessionCredentials) {
    return this
      .sessionApi
      .authenticate(credentials)
      .then((sessionToken) => this.jwtSessionManager.registerNewSession(sessionToken));
  }

  disconnect() {
    this.jwtSessionManager.disconnect();
  }

  tryInitializingSessionFromStorage() {
    this.jwtSessionManager.tryInitializingSessionFromStorage();
  }

  synchronizeSessionFromOtherBrowserTags() {
    this.jwtSessionManager.synchronizeSessionFromOtherBrowserTags();
  }
}
```

Services binding example
------------------------
```typescript
  // browser dependent services
  injector.registerSingleton(BrowserPageActivityManager, PageActivityManager);
  injector.registerSingleton(BrowserUserActivityListener, UserActivityListener);
  // other services
  injector.registerSingleton(IdlenessDetector);
  injector.registerSingleton(SessionService);
```

Project startup configuration example
-------------------------------------
In `index.ts` file:
```typescript
const sessionService = injector.getInstance(SessionService);
sessionService.tryInitializingSessionFromStorage();
sessionService.synchronizeSessionFromOtherBrowserTags();
```

Protected routes example
------------------------
```jsx
<Routes>
<Route path="/login" element={<Login />} />
<Route
  path="/*"
  element={(
    <ConditionalRoute shouldDisplayRoute={sessionService.isAuthenticated()} defaultRoute="/login">
      <div id="main-layout">
        <Navigation />
        <div id="content-layout">
          <Header />
          <Router />
        </div>
      </div>
    </ConditionalRoute>
  )}
/>
</Routes>
```

Login page example
------------------
```typescript
  // the session authentication API call
  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  // check that the user is not already authenticated
  // => if that's the case, then skip the login page and display the authenticated page already! 
  const isAuthenticated = useObservable(sessionService.isAuthenticated());
  useOnDependenciesChange(() => {
    if (isAuthenticated) {
      navigate({ pathname: HOME });
    }
  }, [isAuthenticated]);
  
  // return form onSubmit={tryAuthenticate}
```
