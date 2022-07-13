import { Navigate } from 'react-router-dom';
import React from 'react';

type Props = {
  shouldDisplayRoute: boolean;
  defaultRoute: string;
  children?: React.ReactNode;
};

export default function ConditionalRoute({
  shouldDisplayRoute, defaultRoute, children,
}: Props) {
  if (!shouldDisplayRoute) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <>{children}</>;
}
