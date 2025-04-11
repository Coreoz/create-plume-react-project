import appLogo from '/assets/icons/plume_logo.png';
import { SessionCredentials } from '@api/session/SessionApi';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';
import { Alert } from '@mui/material';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import useMessages from '@i18n/hooks/messagesHook';
import useLoader, {
  LoaderState,
} from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import SessionService from '@services/session/SessionService';
import LoginForm from './LoginForm';
import scss from './login.module.scss';
import { routes, ROUTE_HOME } from '../../../router/RouterDefinition';

export default function Login() {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const { messages, httpError } = useMessages();

  const loader: LoaderState = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  const isAuthenticated: boolean = useObservable(sessionService.isAuthenticated());

  useOnDependenciesChange(() => {
    if (isAuthenticated) {
      routes[ROUTE_HOME]().push();
    }
  }, [isAuthenticated]);

  return (
    <div className={scss.loginLayout}>
      <img src={appLogo} className={scss.loginIcon} alt="logo" />
      <h2 className={scss.loginSubtitle}>{messages.app.name}</h2>
      <div className={scss.loginBox}>
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
        <div className={scss.loginLabel}>
          {messages.login.title}
        </div>
        <LoginForm
          isLoading={loader.isLoading}
          tryAuthenticate={tryAuthenticate}
        />
      </div>
    </div>
  );
}
