import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import dayjs from 'dayjs';
import Status from '../../plume-admin-theme/layout/Status';
import { AdminUserDetails } from '../api/AdminUserTypes';
import MessageService from '../../../i18n/messages/MessageService';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';

type Props = {
  user: AdminUserDetails,
  roles: Map<string, string>,
  onClick: () => void,
}
export default function UserTile({ user, roles, onClick }: Props) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);

  const statusDotFromUser = (isActive: boolean): Status => {
    if (isActive) {
      return Status.OK;
    }
    return Status.WARN;
  }
  return (
    <theme.listSingleElement cssClasses="user-tile">
      <div className="user-data user-data--id">
        <div className="data">
          <theme.statusDot status={statusDotFromUser(!!user)} />
        </div>
        <div className="data">
          <span className="user-initials">
            {user.firstName.slice(0, 1).toUpperCase()}{user.lastName.slice(0, 1).toUpperCase()}
          </span>
        </div>
        <div className="data">
          <span className="label">{user.firstName} {user.lastName}</span>
          <span className="value">{user.email}</span>
        </div>
      </div>
      <div className="user-data">
        <div className="data">
          <span className="value value--accent">{roles.get(user.idRole)}</span>
        </div>
        <div className="data">
          <span className="value value--little">{dayjs(user.creationDate).format('L LT')}</span>
        </div>
      </div>
      <theme.actionButton cssClasses="action-button" onClick={() => onClick()}>
        {messages.action.update}
      </theme.actionButton>
    </theme.listSingleElement>
  )
}
