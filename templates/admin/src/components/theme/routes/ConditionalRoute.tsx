import { Observable, useObservable } from 'micro-observables';
import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  shouldDisplayRoute: Observable<unknown>;
  defaultRoute: string;
  children?: React.ReactNode;
};

export default function ConditionalRoute({
  shouldDisplayRoute, defaultRoute, children,
}: Props) {
  const shouldDisplayRouteValue = useObservable(shouldDisplayRoute);
  if (!shouldDisplayRouteValue) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
}
