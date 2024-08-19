import { ActionButton } from '@components/theme/action/Actions';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

describe('ActionButton', () => {
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