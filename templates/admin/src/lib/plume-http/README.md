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

Main components example
-----------------------
To consume an API, there is 3 steps:
1. Configure the API client: this will build a request and with the attached HTTP client. The API client will generally be the same for all endpoints of the same host. More API clients may be needed to differentiate public and authenticated parts of the whole host API catalog.
2. Configure each API endpoint
3. Consume the API endpoint

Here are sample for these 3 steps:
### Configure the API client
This function be called for each API endpoint identified by a Method and a Path.
A request builder will be returned, when executed, this request will return a [HttpPromise<T>](#httppromise).

```typescript
restRequest<T>(method: HttpMethod, path: string): HttpRequest<HttpPromise<T>> {
  return new HttpRequest<HttpPromise<T>>(
    // the base API client
    (httpRequest) => new HttpPromise<T>(
      // unwrapHttpPromise enables to transforme a Promise<HttpResponse<T>> result to a HttpPromise<T> result
      // while defaultJsonFetchClient will connect take care of HTTP exchange and try to parse the result to a JSON T object (the generic parameter that represents the type we are waiting for)
      unwrapHttpPromise(defaultJsonFetchClient(httpRequest)),
      httpRequest,
    ),
    // the base URL, e.g. https://google.fr/api
    baseUrl,
    // the method, e.g. HttpMethod.GET
    method,
    // the path, e.g. /users/123/addresses
    path,
  );
}
```

TODO
2. Configure each API endpoint
3. Consume the API endpoint

Main concepts
-------------
TODO describe main structures

### HttpPromise
TODO

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
