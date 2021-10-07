import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { WithChildren } from '../../../lib/ts-react-children-type/WithChildren';
import Permission from '../../../services/session/Permission';
import SessionService from '../../../services/session/SessionService';
import ConditionalRoute from './ConditionalRoute';

type Props = WithChildren<{
  permission: Permission,
  path: string,
}>;

export default function PermissionRoute({ permission, path, children }: Props) {
  const sessionService = getGlobalInstance(SessionService);

  return (
    <ConditionalRoute
      shouldDisplayRoute={sessionService.hasPermission(permission)}
      defaultRoute="/home"
      path={path}
    >
      {children}
    </ConditionalRoute>
  );
}
