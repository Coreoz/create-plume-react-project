import { Navigate } from 'react-router-dom';
import React from 'react';
import { Observable, useObservable } from 'micro-observables';

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
