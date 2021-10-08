import React from 'react';
import { WithChildren } from '../../../lib/ts-react-children-type/WithChildren';

export type PopinProps = WithChildren<{
  zIndex?: number,
  height?: string;
  width?: string;
}>;

export function Popin({
  children, zIndex, height, width,
}: PopinProps) {
  return (
    <div className="popin" style={{ zIndex: zIndex ?? 100, height, width }}>
      <div className="popin-container">
        {children}
      </div>
    </div>
  );
}
