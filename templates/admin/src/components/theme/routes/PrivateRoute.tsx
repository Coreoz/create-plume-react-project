import React, { useMemo } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { Location, useLocation } from 'react-router-dom';
import { LOGIN } from '../../Routes';
import ConditionalRoute from './ConditionalRoute';
import SessionService from '../../../services/session/SessionService';

type Props = {
  children?: React.ReactNode,
};

function PrivateRoute(
  {
    children,
  }: Readonly<Props>,
) {
  const sessionService: SessionService = getGlobalInstance(SessionService);
  const location: Location = useLocation();

  const redirectionRoute: string = useMemo(() => (
    `${LOGIN}?redirect=${encodeURIComponent(location.pathname)}`
  ), [location]);

  return <ConditionalRoute
    shouldDisplayRoute={sessionService.isAuthenticated()}
    defaultRoute={redirectionRoute}
  >
    {children}
  </ConditionalRoute>;
}

export default PrivateRoute;
