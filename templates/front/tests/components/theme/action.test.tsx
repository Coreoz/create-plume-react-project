import { ActionButton } from '@components/theme/action/Actions';
import installI18nModule from '@i18n/i18n-module';
import { render, screen } from '@testing-library/react';
import { configureGlobalInjector } from 'plume-ts-di';
import React from 'react';
import '@testing-library/jest-dom';
import { createInjector } from '../../TestUtils';

describe('ActionButton', () => {
  const injector = createInjector();
  installI18nModule(injector);
  configureGlobalInjector(injector);

  it('should render a disabled "click me" submit button', async () => {
    // Render action button
    render(
      <ActionButton disabled>
        Click me
      </ActionButton>
    );

    // Get tested element
    const button: HTMLElement = screen.getByTestId('custom-button');

    // Results
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveAttribute('type', 'submit');
  });
});