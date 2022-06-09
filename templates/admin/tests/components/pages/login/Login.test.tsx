import React from 'react';
import fetchMock from 'fetch-mock';
import { mount, ReactWrapper } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { configureGlobalInjector } from 'plume-ts-di';
import { createInjector } from '../../../TestUtils';
import Login from '../../../../src/components/features/login/Login';
import installServicesModule from '../../../../src/services/services-module';
import installComponentsModule from '../../../../src/components/components-module';
import installApiModule from '../../../../src/api/api-module';
import installI18nModule from '../../../../src/i18n/i18n-module';
import installPlumeAdminUsersModule from '../../../../src/lib/plume-admin-users/plume-admin-users-module';

describe('Tests on Login', () => {
  let wrapper: ReactWrapper;
  const history = createMemoryHistory();
  const injector = createInjector();
  installServicesModule(injector);
  installComponentsModule(injector);
  installApiModule(injector);
  installI18nModule(injector);
  installPlumeAdminUsersModule(injector);
  configureGlobalInjector(injector);
  fetchMock
    .get('/api/example/test/Aur%C3%A9lien', {
      name: 'Aurélien',
    })
    .post('/api/admin/session', {
      webSessionToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzEwMzkwMTB9.Znc7L5SdAL3XuL-6qUumjAFwkZfw3qr5vEVZTRvUf28',
      refreshDurationInMillis: 100000,
      inactiveDurationInMillis: 100000,
    });

  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <Login />
      </Router>,
    );
  });

  test('Login form is rendered', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  // si vous voulez faire d'autres tests, allez voir M. Chardin :)
});
