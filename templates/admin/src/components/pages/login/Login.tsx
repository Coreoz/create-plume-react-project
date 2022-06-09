import appLogo from '/assets/icons/plume_logo.png';
import { Alert } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { SessionCredentials } from '../../../api/session/SessionApi';
import MessageService from '../../../i18n/messages/MessageService';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SessionService from '../../../services/session/SessionService';
import { HOME } from '../../Routes';

export default function Login() {
  const theme = getGlobalInstance(PlumeAdminTheme);
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
      <img src={appLogo} className="app-icon" alt="logo" />
      <h2 className="login-subtitle">{messages.app.name}</h2>
      <div className="login-box">
        {
          loader.error
          && (
            <Alert
              className="form-errors"
              severity="error"
            >
              {messageService.httpError(loader.error)}
            </Alert>
          )
        }
        <div className="login-label">{messages.login.title}</div>
        <form onSubmit={handleSubmit(tryAuthenticate)}>
          <theme.formField inputId="userName" error={errors.userName}>
            <theme.inputText
              label={messages.users.userName}
              control={control}
              type="text"
              name="userName"
              rules={{ required: true }}
              useNameAsId
            />
          </theme.formField>
          <theme.formField inputId="password" error={errors.password}>
            <theme.inputText
              label={messages.users.password}
              control={control}
              type="password"
              name="password"
              autoComplete="off"
              rules={{ required: true }}
              useNameAsId
            />
          </theme.formField>
          <theme.actionsContainer>
            <theme.actionButton isLoading={loader.isLoading} style={ActionStyle.PRIMARY}>
              {messages.action.authenticate}
            </theme.actionButton>
          </theme.actionsContainer>
        </form>
      </div>
    </div>
  );
}
