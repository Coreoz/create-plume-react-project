import { SessionCredentials } from '@api/session/SessionApi';
import InputPassword from '@components/theme/form/fields/InputPassword';
import React from 'react';
import { FormContainer } from 'react-hook-form-mui';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import InputText from '../../theme/form/fields/InputText';

export type LoginFormProps = {
  isLoading: boolean;
  tryAuthenticate: (credentials: SessionCredentials) => void;
};

export default function LoginForm({ isLoading, tryAuthenticate }: LoginFormProps) {
  const { messages } = useMessages();

  return (
    // data-testid is not known by the library
    // @ts-ignore
    <FormContainer FormProps={{ 'data-testid': 'login-form' }} onSuccess={tryAuthenticate}>
      <InputText
        label={messages.users.userName}
        type="text"
        name="userName"
        rules={{ required: true }}
        InputProps={
          {
            'data-testid': 'login-form-username',
          }
        }
      />
      <InputPassword
        label={messages.users.password}
        name="password"
        autoComplete="off"
        rules={{ required: true }}
        InputProps={
          {
            'data-testid': 'login-form-password',
          }
        }
      />
      <ActionsContainer>
        <ActionButton
          isLoading={isLoading}
          style={ActionStyle.PRIMARY}
          dataTestId="login-form-submit"
        >
          {messages.action.authenticate}
        </ActionButton>
      </ActionsContainer>
    </FormContainer>
  );
}
