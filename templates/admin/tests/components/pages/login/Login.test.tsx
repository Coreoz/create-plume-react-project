import { fireEvent, render } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { configureGlobalInjector } from 'plume-ts-di';
import React from 'react';
import { MemoryRouter } from 'react-router';
import installApiModule from '../../../../src/api/api-module';
import installComponentsModule from '../../../../src/components/components-module';
import Login from '../../../../src/components/features/login/Login';
import installI18nModule from '../../../../src/i18n/i18n-module';
import installPlumeAdminUsersModule
  from '../../../../src/lib/plume-admin-users/plume-admin-users-module';
import installServicesModule from '../../../../src/services/services-module';
import { createInjector } from '../../../TestUtils';
import '@testing-library/jest-dom';

describe('LoginForm', () => {
  const injector = createInjector();
  installServicesModule(injector);
  installComponentsModule(injector);
  installApiModule(injector);
  installI18nModule(injector);
  installPlumeAdminUsersModule(injector);
  configureGlobalInjector(injector);
  fetchMock
    .get('http://localhost/api/example/test/Aur%C3%A9lien', {
      name: 'Aurélien',
    })
    .post('http://localhost/api/admin/session',
      {
        body: {
          errorCode: 'WRONG_LOGIN_OR_PASSWORD',
          statusArguments: [],
        },
        status: 400
      }
    );

  it('should render a not disabled button', async() => {
    const wrapper = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const button: HTMLElement | null = await wrapper.findByRole("button");
    expect(button).toBeDefined();
    expect(button).not.toBeDisabled();
  });

  it('should not render an alert box', () => {
    const wrapper = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const alert: HTMLElement | null = wrapper.queryByTestId("login-alert");
    expect(alert).toBeNull();
  });

  it('should render an alert box', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    // Get input and fill values
    const userName: HTMLElement = await wrapper.findByTestId('login-form-username');
    fireEvent.change(userName.querySelector("input")!, { target: { value: 'jdoe' } })
    const password: HTMLElement = await wrapper.findByTestId('login-form-password');
    fireEvent.change(password.querySelector("input")!, { target: { value: 'password' } })

    // Submit form
    const form: HTMLElement = await wrapper.findByTestId('login-form');
    fireEvent.submit(form)

    const alert: HTMLElement = await wrapper.findByTestId("login-alert");
    expect(alert).toBeDefined();
    expect(alert).toHaveTextContent("User name or password incorrect")
  });
});
