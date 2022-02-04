import React from 'react';
import { StatusDotProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

export default function StatusDot({ status }: StatusDotProps): JSX.Element {
  return (
    <span className={`status status--${status}`} />
  )
}
