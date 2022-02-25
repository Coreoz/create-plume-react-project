Simple HTTP Request Builder
===========================

This library provides:
- A very basic representation of an HTTP request that is independent of any HTTP client
- A fluent API to create an HTTP request and make an HTTP call (though to execute the call, an HTTP client must be provided)

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

Usage
-----
An HTTP client is something that takes an HTTP request as a parameter and returns something.
It can be a `Promise`, an `Object` or whatever.

Usage example using an [HTTP client](#http-client-sample-using-fetch):
```typescript
const response: Promise<Response> = new HttpRequest<Promise<Response>>(
  httpClient,
  'http://localhost',
  HttpMethod.GET,
  '/session',
)
.queryParams([['username', 'test'], ['password', 'azerty']])
.execute();
```

The `HttpRequest` creation process should generally be made using a dedicated class.
Examples can be found:
- In the [Simple HTTP Fetch Client](https://github.com/Coreoz/simple-http-request-builder) library
- In the project templates provided by
[Create Plume React Project](https://github.com/Coreoz/create-plume-react-project):
<https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/ApiHttpClient.ts>

HTTP Client sample using fetch
------------------------------
This sample is from [Simple HTTP Fetch Client](https://github.com/Coreoz/simple-http-request-builder) library.

```typescript
const httpClient = (httpRequest: HttpRequest<unknown>): Promise<Response> => { 
  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), httpRequest.optionValues.timeoutInMillis);
  return fetch(
    httpRequest.buildUrl(),
    {
      headers: httpRequest.headersValue,
      method: httpRequest.method,
      body: httpRequest.bodyValue,
      credentials: 'same-origin',
      signal: controller.signal,
    },
  )
  .finally(() => clearTimeout(timeoutHandle));
};
```
