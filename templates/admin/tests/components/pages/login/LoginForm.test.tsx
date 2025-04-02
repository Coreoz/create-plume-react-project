import installI18nModule from '@i18n/i18n-module';
import { render, RenderResult } from '@testing-library/react';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import LoginForm from '../../../../src/components/features/login/LoginForm';
import { createInjector } from '../../../TestUtils';

describe('LoginForm', () => {
  beforeAll(() => {
    const injector: Injector = createInjector();

    installI18nModule(injector);
    configureGlobalInjector(injector);
  });

  it('should render a disabled button', () => {
    const wrapper: RenderResult = render(<LoginForm isLoading tryAuthenticate={vi.fn()} />);
    const button: HTMLElement | null = wrapper.queryByTestId('login-form-submit');
    expect(button).toHaveProperty('disabled', true);
  });
});
