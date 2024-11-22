import scss from '@components/theme/popin/popin.module.scss';
import classNames from '@lib/class-names/ClassNames';
import { PopinProps } from '@lib/plume-admin-theme/popin/PopinProps';
import { Dialog } from '@mui/material';

export default function Popin({
  children, isOpen, onClose, className, title,
}: Readonly<PopinProps>) {
  return (
    <Dialog
      className={classNames(scss.popinContainer, className)}
      open={isOpen}
      onClose={onClose}
    >
      <div className={scss.popin}>
        <div className={scss.popin_title}>{title}</div>
        {children}
      </div>
    </Dialog>
  );
}
