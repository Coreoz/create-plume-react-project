import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import LoginForm from '../../../../src/components/features/login/LoginForm';
import '@testing-library/jest-dom';

describe('LoginForm', () => {
  it('should render a disabled button', () => {
    const wrapper: RenderResult = render(<LoginForm isLoading tryAuthenticate={jest.fn()} />);
    const button: HTMLElement = wrapper.getByRole('button');
    expect(button).toBeDisabled();
  });
});
