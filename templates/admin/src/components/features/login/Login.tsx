import appLogo from '/assets/icons/plume_logo.png';
import { Alert } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useObservable } from 'micro-observables';
import { SessionCredentials } from '../../../api/session/SessionApi';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import useLoader, { LoaderState } from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SessionService from '../../../services/session/SessionService';
import { HOME } from '../../Routes';
import { ActionButton, ActionsContainer } from '../../theme/action/Actions';
import InputText from '../../theme/form/fields/InputText';
import FormField from '../../theme/form/FormField';
import { useOnDependenciesChange } from '../../../lib/react-hooks-alias/ReactHooksAlias';
import useMessages from '../../../i18n/hooks/messagesHook';
import { FormContainer } from 'react-hook-form-mui';

export default function Login() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const { messages, httpError } = useMessages();
  const navigate: NavigateFunction = useNavigate();

  const loader: LoaderState = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());
  useOnDependenciesChange(() => {
    if (isAuthenticated) {
      navigate({ pathname: HOME });
    }
  }, [isAuthenticated]);

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
                {httpError(loader.error)}
              </Alert>
            )
          }
          <div className="login-label">{messages.login.title}</div>
          <FormContainer onSuccess={tryAuthenticate}>
            <FormField inputId="userName">
              <InputText
                label={messages.users.userName}
                type="text"
                name="userName"
                rules={{ required: true }}
                useNameAsId
              />
            </FormField>
            <FormField inputId="password">
              <InputText
                label={messages.users.password}
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
          </FormContainer>
        </div>
      </div>
    </div>
  );
}
