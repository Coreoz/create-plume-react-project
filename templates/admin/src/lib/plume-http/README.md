Simple HTTP Fetch Client
========================
An implementation of the library [Simple HTTP Request Builder](https://github.com/Coreoz/simple-http-request-builder) with fetch.

This library provides a generic HTTP client to simplify the HTTP exchanges with a REST and non-REST remote servers.

Though this library works seamlessly with [Jersey module of Plume Framework](https://github.com/Coreoz/Plume/tree/master/plume-web-jersey), it can be easily adapted to work with any backend API.

Installation
------------
Using NPM:
```
npm install simple-http-request-builder
```

Using Yarn:
```
yarn add simple-http-request-builder
```

General usage
-------------
This library is used by default in the project templates provided by
[Create Plume React Project](https://github.com/Coreoz/create-plume-react-project).
Basic usage of the library can be found in:
- The API client declaration: <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/ApiHttpClient.ts>
- An API client usage (here authentication): <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/session/SessionApi.ts>

Step by step custom usage
-------------------------
Here are the steps to use any custom API:

### Create a basic API client
```typescript
// for just create a proxy to the fetchClient method
const apiFetchClient = <T>(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<T>> => fetchClient(httpRequest);
```

### Add response handlers
Handlers are executed after a successful response is available.
These handlers will:
- Validate some preconditions and if necessary return an error result
- Return a result

So a handler can:
- Either return a result (which can be a successful result or an error), in that case following handlers **will not be executed**
- Either return `undefined`, in that case following handlers **will be executed**

Expected results should be of type `HttpResponse`:
```typescript
/**
 * The expected `Promise` response returned by {@link fetchClient} or by {@link FetchResponseHandler}
 */
export type HttpResponse<T> = {
  /**
   * Contains the response error that should be present only if the response must be considered as an error
   */
  error?: HttpError,
  /**
   * Contains the response of an API call, it should be present only if the response is not considered as an error
   */
  response?: T,
};
```

TODO provide a sample + add docs to methods

#### Add status validator
