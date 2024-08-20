import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import Permission from '../../../services/session/Permission';
import SessionService from '../../../services/session/SessionService';
import { LOGIN } from '../../Routes';
import ConditionalRoute from './ConditionalRoute';

type Props = {
  permission: Permission,
  children?: React.ReactNode,
  defaultRoute?: string,
};

export default function PermissionRoute({ permission, children, defaultRoute }: Props) {
  const sessionService: SessionService = getGlobalInstance(SessionService);

  return (
    <ConditionalRoute
      shouldDisplayRoute={sessionService.hasPermission(permission)}
      defaultRoute={defaultRoute ?? LOGIN}
    >
      {children}
    </ConditionalRoute>
  );
}
