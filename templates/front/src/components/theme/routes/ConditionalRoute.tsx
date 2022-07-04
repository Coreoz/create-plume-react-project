import { Route, useNavigate } from 'react-router-dom';
import React from 'react';

type Props = {
  shouldDisplayRoute: boolean;
  defaultRoute: string;
  path: string;
  children?: React.ReactNode;
};

export default function ConditionalRoute({
  shouldDisplayRoute, defaultRoute, path, children,
}: Props) {
  const navigate = useNavigate();
  if (!shouldDisplayRoute) {
    navigate({ pathname: defaultRoute });
  }

  return (
    <Route path={path}>{children}</Route>
  );
}
