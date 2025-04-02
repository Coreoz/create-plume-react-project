import { fireEvent, render } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import { describe, expect, it } from 'vitest';
import installApiModule from '../../../../src/api/api-module';
import installComponentsModule from '../../../../src/components/components-module';
import Login from '../../../../src/components/features/login/Login';
import installI18nModule from '../../../../src/i18n/i18n-module';
import installPlumeAdminUsersModule from '../../../../src/lib/plume-admin-users/plume-admin-users-module';
import installServicesModule from '../../../../src/services/services-module';
import { createInjector } from '../../../TestUtils';

describe('Login', () => {
  const injector: Injector = createInjector();
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
        status: 400,
      },
    );

  it('should render a not disabled button', async () => {
    const wrapper = render(
      <Login />,
    );
    const button: HTMLElement | null = wrapper.queryByTestId('login-form-submit');

    expect(button).toHaveProperty('disabled', false);
    expect(button).toBeDefined();
  });

  it('should not render an alert box', () => {
    const wrapper = render(
      <Login />,
    );
    const alert: HTMLElement | null = wrapper.queryByTestId('login-alert');
    expect(alert).toBeNull();
  });

  it('should render an alert box', async () => {
    const wrapper = render(
      <Login />,
    );

    // Get input and fill values
    const userName: HTMLElement = (await wrapper.findAllByTestId('login-form-username'))[0] as HTMLElement;
    fireEvent.change(userName.querySelector('input')!, { target: { value: 'jdoe' } });
    const password: HTMLElement = (await wrapper.findAllByTestId('login-form-password'))[0] as HTMLElement;
    fireEvent.change(password.querySelector('input')!, { target: { value: 'password' } });

    // Submit form
    const form: HTMLElement = (await wrapper.findAllByTestId('login-form'))[0] as HTMLElement;
    fireEvent.submit(form);

    const alert: HTMLElement = (await wrapper.findAllByTestId('login-alert'))[0] as HTMLElement;
    expect(alert).toBeDefined();
    expect(alert.textContent).toBe('User name or password incorrect');
  });
});
