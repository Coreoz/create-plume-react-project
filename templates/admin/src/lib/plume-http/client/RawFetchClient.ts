import HttpRequest from '../../simple-http-request-builder/HttpRequest';
import { HttpPlumeResponse } from './PlumeHttpResponse';
import validateBasicStatusCodes from './FetchStatusValidators';
import fetchClient from './FetchClient';

const rawFetchClient = (httpRequest: HttpRequest<unknown>)
: Promise<HttpPlumeResponse<Response>> => fetchClient(httpRequest, validateBasicStatusCodes);

export default rawFetchClient;
