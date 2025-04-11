import Users from '@lib/plume-admin-users/pages/Users';
import { UsersRouterProvider } from '@lib/plume-admin-users/router/UsersRouter';

export default function UsersRoot() {
  return (
    <UsersRouterProvider>
      <Users />
    </UsersRouterProvider>
  );
}
