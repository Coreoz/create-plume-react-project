import React from 'react';
import { FormContainer } from 'react-hook-form-mui';
import { SessionCredentials } from '../../../api/session/SessionApi';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import InputText from '../../theme/form/fields/InputText';
import FormField from '../../theme/form/FormField';

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
      <FormField inputId="userName">
        <InputText
          dataTestId="login-form-username"
          label={messages.users.userName}
          type="text"
          name="userName"
          rules={{ required: true }}
          useNameAsId
        />
      </FormField>
      <FormField inputId="password">
        <InputText
          dataTestId="login-form-password"
          label={messages.users.password}
          type="password"
          name="password"
          autoComplete="off"
          rules={{ required: true }}
          useNameAsId
        />
      </FormField>
      <ActionsContainer>
        <ActionButton isLoading={isLoading} style={ActionStyle.PRIMARY}>
          {messages.action.authenticate}
        </ActionButton>
      </ActionsContainer>
    </FormContainer>
  );
}
