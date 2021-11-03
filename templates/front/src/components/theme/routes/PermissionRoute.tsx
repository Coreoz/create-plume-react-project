import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import Permission from '../../../services/session/Permission';
import SessionService from '../../../services/session/SessionService';
import ConditionalRoute from './ConditionalRoute';

type Props = {
  permission: Permission;
  path: string;
  children?: React.ReactNode;
};

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
