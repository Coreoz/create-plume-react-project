import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import { useForm } from 'react-hook-form';
import { Alert } from '@material-ui/core';
import SessionService from '../../../services/session/SessionService';
import { SessionCredentials } from '../../../api/session/SessionApi';
import FormField from '../../theme/form/FormField';
import useLoader from '../../../lib/plume-http/hook/PlumeHttpHookLoader';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import { HttpPlumeError } from '../../../lib/plume-http/client/PlumeHttpResponse';
import InputText from '../../theme/form/fields/InputText';
import { HOME } from '../../Routes';
import MessageService from '../../../i18n/messages/MessageService';

export default function Login() {
  const sessionService = getGlobalInstance(SessionService);
  const messageService = getGlobalInstance(MessageService);
  const messages = messageService.t();

  if (sessionService.isAuthenticated()) {
    return <Redirect to={{ pathname: HOME }} />;
  }

  const [httpError, setHttpError] = useState<HttpPlumeError>();

  const {
    handleSubmit, control, formState: { errors },
  } = useForm<SessionCredentials>();

  const loader = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.withLoading(sessionService
      .authenticate(credentials)
      .catch(setHttpError));
  };

  return (
    <div className="login-page">
      <h1>Plume Admin</h1>
      <div className="login-box">
        {httpError && (
          <Alert className="form-errors" severity="error">{messageService.httpError(httpError)}</Alert>
        )}
        <strong>{messages['login.title']}</strong>
        <form onSubmit={handleSubmit(tryAuthenticate)}>
          <FormField inputId="userName" label={messages['users.USERNAME']} error={errors.userName}>
            <InputText control={control} type="text" name="userName" rules={{ required: true }} useNameAsId />
          </FormField>
          <FormField inputId="password" label={messages['users.PASSWORD']} error={errors.password}>
            <InputText
              control={control}
              type="password"
              name="password"
              autoComplete="off"
              rules={{ required: true }}
              useNameAsId
            />
          </FormField>
          <ActionsContainer>
            <ActionButton cssClasses="" loadingState={loader.loadingState}>
              {messages['action.authenticate']}
            </ActionButton>
          </ActionsContainer>
        </form>
      </div>
    </div>
  );
}
