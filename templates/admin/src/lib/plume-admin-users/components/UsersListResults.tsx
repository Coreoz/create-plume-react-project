import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table as TableType,
} from '@tanstack/react-table';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UserTile from './UserTile';

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

  return (
    <>
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
