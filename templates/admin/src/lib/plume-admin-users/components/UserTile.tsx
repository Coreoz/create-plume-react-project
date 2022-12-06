import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import dayjs from 'dayjs';
import { Row } from '@tanstack/react-table';
import Status from '../../plume-admin-theme/layout/Status';
import { AdminUserDetails } from '../api/AdminUserTypes';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useMessages from '../../../i18n/hooks/messagesHook';

type Props = {
  userRow: Row<AdminUserDetails>,
  onClick: () => void,
};

type AdminUserDetailsTile = {
  firstName: string,
  lastName: string
  email: string
  role: string
  creationDate: string
};

export default function UserTile({ userRow, onClick }: Props) {
  const { messages } = useMessages();
  const theme = getGlobalInstance(PlumeAdminTheme);

  const statusDotFromUser = (isActive: boolean): Status => {
    if (isActive) {
      return Status.OK;
    }
    return Status.WARN;
  };

  const user: AdminUserDetailsTile = {
    firstName: userRow.getValue('firstName') as string,
    lastName: userRow.getValue('lastName') as string,
    email: userRow.getValue('email') as string,
    role: userRow.getValue('role') as string,
    creationDate: dayjs(userRow.getValue('creationDate')).format('L LT'),
  };

  return (
    <theme.listSingleElement cssClasses="user-tile">
      <div className="user-data user-data--id">
        <div className="data">
          <theme.statusDot status={statusDotFromUser(!!userRow)} />
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
            <div className="data">
              <span className="value value--accent">{user.role}</span>
            </div>
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
