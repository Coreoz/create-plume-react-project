import {
  AdminUsersWithIndexedRolesType,
} from '@lib/plume-admin-users/pages/AdminUsersWithIndexedRolesType';
import {
  ROUTE_USERS_CREATE,
  ROUTE_USERS_UPDATE,
  UseUsersRoute,
  useUsersRoute,
} from '@lib/plume-admin-users/router/UsersRouter';
import UsersEdit from '../pages/UsersEdit';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  updateUsersAndRoles: () => void,
};

function UsersRouterComponent(
  {
    usersWithRoles,
    updateUsersAndRoles,
  }: Props,
) {
  const route: UseUsersRoute = useUsersRoute();

  return (
    <>
      {
        route.name === ROUTE_USERS_CREATE
        && (
          <UsersEdit
            updateUsersAndRoles={updateUsersAndRoles}
            userId={undefined}
            usersWithRoles={usersWithRoles}
          />
        )
      }
      {
        route.name === ROUTE_USERS_UPDATE
        && (
          <UsersEdit
            updateUsersAndRoles={updateUsersAndRoles}
            userId={route.params.userId}
            usersWithRoles={usersWithRoles}
          />
        )
      }
    </>
  );
}

export default UsersRouterComponent;
