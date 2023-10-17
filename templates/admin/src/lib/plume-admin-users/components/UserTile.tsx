import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import dayjs from 'dayjs';
import useMessages from '../../../i18n/hooks/messagesHook';
import Status from '../../plume-admin-theme/layout/Status';
import { AdminUserDetails } from '../api/AdminUserTypes';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';

type Props = {
  user: AdminUserDetails,
  roles: Map<string, string> | undefined,
  onClick: () => void,
};

export default function UserTile({ user, roles, onClick }: Props) {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);

  const statusCircle = (isActive: boolean): Status => {
    if (isActive) {
      return Status.OK;
    }
    return Status.WARN;
  };

  return (
    <theme.listSingleElement cssClasses="user-tile">
      <div className="user-data user-data--id">
        <div className="data">
          <theme.statusDot status={statusCircle(Boolean(user))} />
        </div>
        <div className="data">
          <span className="user-initials">
            {`${user.firstName.slice(0, 1).toUpperCase()}${user.lastName.slice(0, 1).toUpperCase()}`}
          </span>
        </div>
        <div className="data">
          <span className="label">
            {`${user.firstName} ${user.lastName}`}
          </span>
          <span className="value">{user.email}</span>
        </div>
      </div>
      <div className="user-data">
        {
          roles
          && (
            <div className="data">
              <span className="value value--accent">{roles.get(user.idRole)}</span>
            </div>
          )
        }
        <div className="data">
          <span className="value value--little">{dayjs(user.creationDate).format('L LT')}</span>
        </div>
      </div>
      <theme.actionButton cssClasses="action-button" onClick={() => onClick()}>
        {messages.action.update}
      </theme.actionButton>
    </theme.listSingleElement>
  );
}
