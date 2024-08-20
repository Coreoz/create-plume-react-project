import appLogo from '/assets/icons/plume_logo.png';
import { Alert } from '@mui/material';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { SessionCredentials } from '../../../api/session/SessionApi';
import useMessages from '../../../i18n/hooks/messagesHook';
import useLoader, {
  LoaderState,
} from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnDependenciesChange } from '../../../lib/react-hooks-alias/ReactHooksAlias';
import SessionService from '../../../services/session/SessionService';
import { HOME } from '../../Routes';
import LoginForm from './LoginForm';

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
  }, [isAuthenticated, navigate]);

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
                data-testid="login-alert"
                className="form-errors"
                severity="error"
              >
                {httpError(loader.error)}
              </Alert>
            )
          }
          <div className="login-label">{messages.login.title}</div>
          <LoginForm
            isLoading={loader.isLoading}
            tryAuthenticate={tryAuthenticate}
          />
        </div>
      </div>
    </div>
  );
}
