import useMessages from '@i18n/hooks/messagesHook';
import classNames from '@lib/class-names/ClassNames';
import { ListHeadProps } from '@lib/plume-admin-theme/list/ListProps';

import scss from './list-head.module.scss';

function ListHead({
  title, isLoading, className, children,
}: Readonly<ListHeadProps>) {
  const { messages } = useMessages();
  return (
    <header className={classNames(scss.listHead, className)}>
      <div className={scss.title}>
        <h2>{isLoading ? messages.label.loading : title}</h2>
      </div>
      {
        children
        && (
          <div className={scss.actions}>
            {children}
          </div>
        )
      }
    </header>
  );
}

export default ListHead;
