import { Row } from '@tanstack/react-table';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import useMessages from '../../../i18n/hooks/messagesHook';
import Status from '../../plume-admin-theme/layout/Status';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';

type Props = {
  user: Row<AdminUserDetails>,
  onClick: () => void,
};

export default function UserTile({ user, onClick }: Props) {
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
            {user.getValue<string>('initials')}
          </span>
        </div>
        <div className="data">
          <span className="label">
            {`${user.getValue('firstName')} ${user.getValue('lastName')}`}
          </span>
          <span className="value">{user.getValue<string>('email')}</span>
        </div>
      </div>
      <div className="user-data">
        <div className="data">
          <span className="value value--accent">{user.getValue<string>('role')}</span>
        </div>
        <div className="data">
          <span
            className="value value--little"
          >
            {user.getValue<string>('creationDate')}
          </span>
        </div>
      </div>
      <theme.actionButton cssClasses="action-button" onClick={() => onClick()}>
        {messages.action.update}
      </theme.actionButton>
    </theme.listSingleElement>
  );
}
