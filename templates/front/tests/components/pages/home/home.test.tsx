import Home from '@components/pages/home/Home';
import installI18nModule from '@i18n/i18n-module';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { http, HttpHandler, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createInjector } from '../../../TestUtils';

// Set up mock HTTP server with default handler
const restHandlers: HttpHandler[] = [
  http.get(
    '/api/example/test/*',
    () => {
      return HttpResponse.json({ name: 'John Doe' });
    },
    { once: true },
  ),
];

const server: SetupServerApi = setupServer(...restHandlers);

describe('Home Component', () => {
  // Set up DI and mock server
  beforeAll(() => {
    const injector: Injector = createInjector();
    installI18nModule(injector);
    configureGlobalInjector(injector);

    server.listen({ onUnhandledRequest: 'error' });
  });

  // Clean up after tests
  afterAll(() => server.close());

  // Reset handlers after each test
  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  it('renders successfully with API response', async () => {
    render(
      <Home />,
    );

    // Should show loading and title initially
    expect(screen.getByText(/Home page/)).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for API response
    await waitFor(() => {
      // Check that the success message and name are displayed
      expect(screen.getByText(/API call success!/)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    // Override the default handler to simulate an error
    server.use(
      http.get('/api/example/test/*', () => {
        return HttpResponse.json(
          {
            errorCode: 'INTERNAL_ERROR',
            statusArguments: [],
          },
          {
            status: 500,
          },
        );
      }),
    );

    render(
      <Home />,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Could not call API:/)).toBeInTheDocument();
      expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument();
    });
  });
});
