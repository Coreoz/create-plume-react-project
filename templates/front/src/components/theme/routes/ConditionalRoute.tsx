import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { WithChildren } from '../../../lib/ts-react-children-type/WithChildren';

type Props = WithChildren<{
  shouldDisplayRoute: boolean,
  defaultRoute: string,
  path: string,
}>;

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
