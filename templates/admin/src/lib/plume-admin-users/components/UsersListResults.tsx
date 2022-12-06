import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table as TableType,
} from '@tanstack/react-table';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UserTile from './UserTile';
import useMessages from '../../../i18n/hooks/messagesHook';

type Props = {
  usersPath: string
  table: TableType<AdminUserDetails>
};

function UsersListResults(
  {
    table, usersPath,
  }: Props,
) {
  const theme = getGlobalInstance(PlumeAdminTheme);
  const navigate = useNavigate();
  const { messages } = useMessages();

  return (
    <>
        <theme.listHeader
            listTitle={messages.user.list.count(table.getTotalSize())}
            tableSorting={{
              sortedObjectKey: 'user',
              defaultSortKey: 'fullName_desc',
              table,
            }}
        />
      <theme.listElements listLength={table.getPageCount()}>
          {React.Children.toArray(
            table.getRowModel().rows.map((row) => (
              <UserTile
                  onClick={() => {
                    navigate({ pathname: `${usersPath}/${row.id}` });
                  }}
                  userRow={row}
              />
            )))}
      </theme.listElements>
    </>
  );
}

export default (UsersListResults);
