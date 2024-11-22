import classNames from '@lib/class-names/ClassNames';
import { Skeleton } from '@mui/material';

import scss from './list.module.scss';

function ListLoader() {
  return (
    <>
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation="wave" />
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation={false} />
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation="wave" />
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation={false} />
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation="wave" />
      <Skeleton className={classNames(scss.listItem, scss.listItemLoader)} variant="rounded" animation={false} />
    </>
  );
}

export default ListLoader;
