HTTP Client
===========

This library provides a generic HTTP client to simplify the HTTP exchanges with a REST and non-REST remote servers.

This library focus mainly on HTTP calls that comply to a backend made with the
Though this library works seamlessly with [Jersey module of Plume Framework](https://github.com/Coreoz/Plume/tree/master/plume-web-jersey). It can be easily adapted to work with any backend API.

This library is used by default in the project templates provided by
[Create Plume React Project](https://github.com/Coreoz/create-plume-react-project).
Basic usage of the library can be found in:
- The API client declaration: <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/ApiHttpClient.ts>
- An API client usage (here authentication): <https://github.com/Coreoz/create-plume-react-project/blob/master/templates/admin/src/api/session/SessionApi.ts>
