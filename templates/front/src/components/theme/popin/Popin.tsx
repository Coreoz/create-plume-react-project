import React from 'react';
import scss from './popin.module.scss';

export type PopinProps = {
  zIndex?: number,
  height?: string;
  width?: string;
  children?: React.ReactNode;
};

export function Popin({
  children, zIndex, height, width,
}: PopinProps) {
  return (
    <div className={scss.popin} style={{ zIndex: zIndex ?? 100 }}>
      <div className={scss.popinContainer} style={{ height, width }}>
        {children}
      </div>
    </div>
  );
}
