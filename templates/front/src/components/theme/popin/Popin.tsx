import React from 'react';

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
    <div className="popin">
      <div className="popin-container" style={{ zIndex: zIndex ?? 100, height, width }}>
        {children}
      </div>
    </div>
  );
}
