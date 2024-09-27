import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Observable, useObservable } from 'micro-observables';

type Props = {
  shouldDisplayRoute: Observable<boolean>,
  defaultRoute: string,
  children?: ReactNode,
};

export default function ConditionalRoute({
  shouldDisplayRoute, defaultRoute, children,
}: Props) {
  const shouldDisplayRouteValue: boolean = useObservable(shouldDisplayRoute);
  if (!shouldDisplayRouteValue) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
}
