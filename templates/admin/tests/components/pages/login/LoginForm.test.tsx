import installI18nModule from '@i18n/i18n-module';
import { render, RenderResult } from '@testing-library/react';
import { configureGlobalInjector } from 'plume-ts-di';
import React from 'react';
import LoginForm from '../../../../src/components/features/login/LoginForm';
import '@testing-library/jest-dom';
import { createInjector } from '../../../TestUtils';

describe('LoginForm', () => {
  const injector = createInjector();
  installI18nModule(injector);
  configureGlobalInjector(injector);

  it('should render a disabled button', () => {
    const wrapper: RenderResult = render(<LoginForm isLoading tryAuthenticate={jest.fn()} />);
    const button: HTMLElement | null = wrapper.queryByTestId("login-form-submit");
    expect(button).toBeDisabled();
  });
});
