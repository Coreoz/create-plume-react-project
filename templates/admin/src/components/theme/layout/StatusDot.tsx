import React from 'react';
import { StatusDotProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

/**
 * StatusDot is a dot that is colored by its status value
 * @param status: {@link StatusDotProps}
 */
export default function StatusDot({ status }: StatusDotProps): JSX.Element {
  return (
    <span className={`status status--${status}`} />
  );
}
