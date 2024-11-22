import useMessages, { Messages } from '@i18n/hooks/messagesHook';
import { AdminUserDetails } from '@lib/plume-admin-users/api/AdminUserTypes';
import dayjs from 'dayjs';

import scss from './user-tile.module.scss';

type Props = {
  user: AdminUserDetails,
};

export default function UserTile({ user }: Props) {
  const { messages }: Messages = useMessages();
  return (
    <div className={scss.userTile}>
      <div className={scss.userData}>
        <div className={scss.data}>
          <span className={scss.userInitials}>
            {`${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}
          </span>
        </div>
        <div className={scss.data}>
          <span className={scss.label}>
            {`${user.firstName} ${user.lastName}`}
          </span>
          <span className={scss.value}>{user.email}</span>
        </div>
      </div>
      <div className={scss.userData}>
        <div className={scss.data}>
          <span className={scss.valueLittle}>
            {messages.user.created(dayjs(user.creationDate).format('L LT'))}
          </span>
        </div>
      </div>
    </div>
  );
}
