import { ActionButton } from '@components/theme/action/Actions';
import installI18nModule from '@i18n/i18n-module';
import { render, screen } from '@testing-library/react';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import { describe, expect, it } from 'vitest';
import { createInjector } from '../../TestUtils';

describe('ActionButton', () => {
  beforeAll(() => {
    const injector: Injector = createInjector();
    installI18nModule(injector);
    configureGlobalInjector(injector);
  })

  it('should render a disabled "click me" submit button', async () => {
    // Render action button
    render(
      <ActionButton disabled dataTestId="custom-button">
        Click me
      </ActionButton>,
    );

    // Get tested element
    const button: HTMLElement = screen.getByTestId('custom-button');

    // Results
    expect(button).toHaveProperty('disabled', true);
    expect(button.textContent).toBe('Click me');
    expect(button).toHaveProperty('type', 'submit');
  });
});
