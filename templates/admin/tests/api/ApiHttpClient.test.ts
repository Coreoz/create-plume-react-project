import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { HttpMethod } from 'simple-http-request-builder';
import { ApplicationLogger, LoggerLevel } from 'simple-logging-system';
import {
  afterAll, afterEach, beforeAll, describe, expect, it, vi,
} from 'vitest';
import ApiHttpClient from '../../src/api/ApiHttpClient';

const API_URL: string = 'http://localhost:3000/api/upload';

type LogCall = Parameters<typeof ApplicationLogger.log>;

const server = setupServer();

const listenToApiErrors = () => vi.spyOn(ApplicationLogger, 'log');

const findApiHttpClientErrorLogs = (calls: LogCall[]): LogCall[] => calls.filter(
  (call: LogCall) => call[0] === LoggerLevel.ERROR && call[1] === 'ApiHttpClient',
);

const mockUploadResponse = (status: number) => http.post(
  '/api/upload',
  () => HttpResponse.json(
    { errorCode: 'CONTENT_SIZE_LIMIT_EXCEEDED', statusArguments: [] },
    { status },
  ),
);

describe('ApiHttpClient content size limit logging', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    vi.restoreAllMocks();
  });

  it('logs an error with status and URL when a JSON request receives HTTP 413', async () => {
    server.use(mockUploadResponse(413));
    const logSpy = listenToApiErrors();

    await new ApiHttpClient()
      .restRequest(HttpMethod.POST, '/upload')
      .execute()
      .catch(() => undefined)
      .toPromise();

    const errorLogs: LogCall[] = findApiHttpClientErrorLogs(logSpy.mock.calls);
    expect(errorLogs).toHaveLength(1);
    const [, , message, context] = errorLogs[0] as [LoggerLevel, string, string, { status: number, url: string }];
    expect(message).toContain('413');
    expect(message).toContain(API_URL);
    expect(context).toEqual({ status: 413, url: API_URL });
  });

  it('logs an error with status and URL when a raw request receives HTTP 413', async () => {
    server.use(mockUploadResponse(413));
    const logSpy = listenToApiErrors();

    await new ApiHttpClient()
      .rawRequest(HttpMethod.POST, '/upload')
      .execute()
      .toPromise();

    const errorLogs: LogCall[] = findApiHttpClientErrorLogs(logSpy.mock.calls);
    expect(errorLogs).toHaveLength(1);
    const [, , message, context] = errorLogs[0] as [LoggerLevel, string, string, { status: number, url: string }];
    expect(message).toContain('413');
    expect(message).toContain(API_URL);
    expect(context).toEqual({ status: 413, url: API_URL });
  });

  it.each([400, 403])('does not log a content size limit error for HTTP %i', async (status: number) => {
    server.use(mockUploadResponse(status));
    const logSpy = listenToApiErrors();

    await new ApiHttpClient()
      .restRequest(HttpMethod.POST, '/upload')
      .execute()
      .catch(() => undefined)
      .toPromise();

    expect(findApiHttpClientErrorLogs(logSpy.mock.calls)).toHaveLength(0);
  });
});
