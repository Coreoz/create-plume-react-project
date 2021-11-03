import { Route, Redirect } from 'react-router-dom';
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
  return (
    <Route
      path={path}
      render={() => (shouldDisplayRoute
        ? (children)
        : (<Redirect to={{ pathname: defaultRoute }} />))}
    />
  );
}
