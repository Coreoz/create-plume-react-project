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

### Configure each API endpoint
Here the goal is to configure the specific API call to an endpoint. So the previous [API client](#configure-the-api-client) created will be used.

In the following example:
- The endpoint is `/admin/session` to authenticate a user by verifying its credentials
- This endpoint takes a JSON object as a body argument that complies to the TS type `SessionCredentials`
- This endpoint returns a JSON object that complies to the TS type `SessionToken`

```typescript
authenticate(credentials: SessionCredentials): HttpPromise<SessionToken>  {
  return httpClient
    .restRequest<SessionToken>(HttpMethod.POST, '/admin/session')
    .jsonBody(credentials)
    // this line will execute the request on the httpClient and return the result promise
    .execute();
}
```

### Consume the API endpoint
Here the previous configured [API endpoint call](#configure-each-api-endpoint) will be used to actually make the call inside the project logic.

```typescript
authenticate(credentials: SessionCredentials) {
  sessionApi
    .authenticate(credentials)
    .then((sessionToken: SessionToken) => {
      console.log(`Session created ${sessionToken.webSessionToken}, should grant access to the user`);
    })
    .catch((httpError: HttpError) => {
      // see below to have a look of the error codes handled by the library and how to configure you owns errors
      console.log(`Authentication failed, error code: ${httpError.errorCode}`);
    });
}
```

Main concepts
-------------
Basic types are:
- [HttpRequest](#httprequest): request configuration
- [FetchResponseHandler](#fetchresponsehandler): raw `fetch` `Response` validation/transformation
- [HttpResponse](#httpresponse): the response created from a [FetchResponseHandler](#fetchresponsehandler)

On top of that, the [HttpPromise](#httppromise) is often used on a [HttpResponse](#httpresponse) object to:
- Ease the usage of the Promise
- Make sure to have logs in case an error occurred even though a `catch` statement is not set

TODO put links towards each type source code

### HttpRequest
It represents a request that will be executed by an HttpClient.
This is the main object defined in [Simple HTTP Request Builder](https://github.com/Coreoz/simple-http-request-builder).
See directly the type source for documentation: <https://github.com/Coreoz/simple-http-request-builder/tree/master/src/HttpRequest.ts>

### HttpResponse
This object represents the successful or failed HTTP response.
It is returned by an HttpClient and by a [FetchResponseHandler](#fetchresponsehandler).
HTTP failures are represented by an [error](#httperror).

### FetchResponseHandler
Handlers are executed after a successful HTTP response is available: this means a 200 HTTP response has been received.
These handlers will:
- Validate some preconditions and if necessary return an error result
- Return a result

So a handler can:
- Either return a result (which can be a successful result or an error), in that case following handlers **will not be executed**
- Either return `undefined`, in that case following handlers **will be executed**

Expected results should be of type [HttpResponse](#httpresponse).

TODO provide a sample

### HttpPromise
TODO

### HttpError
Http errors can be:
- Raised by the library, in that case the work will only be to if necessary display the correct error message
- Raised by the project that configured the library to a specific API that raises its own errors

#### Errors raised by the library
The errors handled by the library are:
- **NETWORK_ERROR**: It means the remote API could not be contacted, it is likely due to poor network connection on the client side
- **TIMEOUT_ERROR**: It means the remote API could be contact but no result has been returned after the timeout delay. It might also be due to poor network connection, but it can also be due to an API issue. The default timeout is 20 seconds, but that can be configured
- **FORBIDDEN_ERROR**: It means the API returned a 403 response. This error is raised by the [validator](#TODO) `validateBasicStatusCodes` 
- **INTERNAL_ERROR**: It means a parsing error occurred: a `then` function provided to a `HttpPromise.then()` function raised an error, the parsing of the JSON object raised an error, the server returned a non JSON response, etc. Since this error is related to a developer error or a backend error, we generally want to display the same generic error to an end user. If this error is not suitable for a project, it is possible to get rid of this by having customized [validator](#TODO) and wrapping `then` and `catch` functions provided to [HttpPromise](#httppromise) to make sure these functions never fails or raised custom [HttpError](#httperror)

Step by step custom usage
-------------------------
Here are the steps to use any custom API:

### Create a basic API client
```typescript
// for just create a proxy to the fetchClient method
const apiFetchClient = <T>(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<T>> => fetchClient(httpRequest);
```

### Add response handlers
TODO

#### Add validators
TODO

#### Add a response mapper
TODO

Advanced usages
---------------

### SynchronizedHttpPromise
TODO

### PromiseMonitor
TODO
