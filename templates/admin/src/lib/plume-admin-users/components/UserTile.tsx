import { Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import useMessages from '../../../i18n/hooks/messagesHook';
import Status from '../../plume-admin-theme/layout/Status';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';

type Props = {
  userRow: Row<AdminUserDetails>,
  onClick: () => void,
};

type AdminUserDetailsTile = {
  fullName: string,
  email: string,
  role: string,
  creationDate: string,
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
    fullName: userRow.getValue('fullName') as string,
    email: userRow.getValue('email') as string,
    role: userRow.getValue('role') as string,
    creationDate: dayjs(userRow.getValue('creationDate')).format('L LT'),
  };

  const getFirstLetterOfWordCapitalized = (
    s: string, index: number,
  ) => user.fullName.split(' ')[index].slice(0, 1).toUpperCase();

  const retrieveInitials = (
    fullName: string,
  ) => `${getFirstLetterOfWordCapitalized(fullName, 0)} ${getFirstLetterOfWordCapitalized(fullName, 1)}`;

  return (
    <theme.listSingleElement cssClasses="user-tile">
      <div className="user-data user-data--id">
        <div className="data">
          <theme.statusDot status={statusDotFromUser(!!userRow)} />
        </div>
        <div className="data">
          <span className="user-initials">
            {retrieveInitials(user.fullName)}
          </span>
        </div>
        <div className="data">
          <span className="label">
            {user.fullName}
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
