import appLogo from '/assets/icons/plume_logo.png';
import { Alert } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SessionCredentials } from '../../../api/session/SessionApi';
import MessageService from '../../../i18n/messages/MessageService';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SessionService from '../../../services/session/SessionService';
import { HOME } from '../../Routes';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import InputText from '../../theme/form/fields/InputText';
import FormField from '../../theme/form/FormField';

export default function Login() {
  const sessionService = getGlobalInstance(SessionService);
  const messageService = getGlobalInstance(MessageService);
  const messages = messageService.t();
  const navigate = useNavigate();

  if (sessionService.isAuthenticated()) {
    navigate({ pathname: HOME });
    return null;
  }

  const {
    handleSubmit, control, formState: { errors },
  } = useForm<SessionCredentials>();

  const loader = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  return (
    <div className="login-layout">
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
            <FormField inputId="userName" error={errors.userName}>
              <InputText
                label={messages.users.userName}
                control={control}
                type="text"
                name="userName"
                rules={{ required: true }}
                useNameAsId
              />
            </FormField>
            <FormField inputId="password" error={errors.password}>
              <InputText
                label={messages.users.password}
                control={control}
                type="password"
                name="password"
                autoComplete="off"
                rules={{ required: true }}
                useNameAsId
              />
            </FormField>
            <ActionsContainer>
              <ActionButton isLoading={loader.isLoading} style={ActionStyle.PRIMARY}>
                {messages.action.authenticate}
              </ActionButton>
            </ActionsContainer>
          </form>
        </div>
      </div>
    </div>
  );
}
