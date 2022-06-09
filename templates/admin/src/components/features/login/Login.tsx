import React from 'react';
import { Redirect } from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import { useForm } from 'react-hook-form';
import { Alert } from '@mui/material';
import SessionService from '../../../services/session/SessionService';
import { SessionCredentials } from '../../../api/session/SessionApi';
import FormField from '../../theme/form/FormField';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import InputText from '../../theme/form/fields/InputText';
import { HOME } from '../../Routes';
import MessageService from '../../../i18n/messages/MessageService';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';

export default function Login() {
  const sessionService = getGlobalInstance(SessionService);
  const messageService = getGlobalInstance(MessageService);
  const messages = messageService.t();

  if (sessionService.isAuthenticated()) {
    return <Redirect to={{ pathname: HOME }} />;
  }

  const {
    handleSubmit, control, formState: { errors },
  } = useForm<SessionCredentials>();

  const loader = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  return (
    <div className="login-page">
      <h1>Plume Admin</h1>
      <div className="login-box">
        {loader.error && (
          <Alert className="form-errors" severity="error">{messageService.httpError(loader.error)}</Alert>
        )}
        <strong>{messages.login.title}</strong>
        <form onSubmit={handleSubmit(tryAuthenticate)}>
          <FormField inputId="userName" label={messages.users.userName} error={errors.userName}>
            <InputText control={control} type="text" name="userName" rules={{ required: true }} useNameAsId />
          </FormField>
          <FormField inputId="password" label={messages.users.password} error={errors.password}>
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
            <ActionButton cssClasses="" isLoading={loader.isLoading}>
              {messages.action.authenticate}
            </ActionButton>
          </ActionsContainer>
        </form>
      </div>
    </div>
  );
}
