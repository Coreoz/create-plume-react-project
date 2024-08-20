import { Grid, Icon, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from '@lib/class-names/ClassNames';
import {
  HeadingLevel,
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from '@lib/plume-admin-theme/layout/LayoutProps';

import scss from './panel.module.scss';

export function Panel({ children }: PanelProps) {
  return (
    <div className={scss.panel}>
      {children}
    </div>
  );
}

export function PanelSeparator() {
  return <hr />;
}

export function PanelTitle(
  {
    children,
    level = 'h1',
    backLink,
  }: PanelTitleProps,
) {
  const Level: HeadingLevel = level;
  return (
    <div className={scss.panelTitle}>
      {
        backLink
        && (
          <IconButton className={scss.link} component={Link} to={backLink!}>
            <Icon>arrow_back</Icon>
          </IconButton>
        )
      }
      <Level>
        {children}
      </Level>
    </div>
  );
}

export function PanelContent({ children }: PanelProps) {
  return (
    <div className={scss.panelContent}>
      {children}
    </div>
  );
}

/**
 * Layout component that wraps a child, handling page disposition
 * @param children the wrapped component
 * @param columns number of columns displayed
 * @param cssClasses optional additional className
 */
export function PanelContentElement({
  children,
  columns,
  className,
}: PanelContentElementProps) {
  return (
    <Grid
      className={classNames(scss.columnsContainer, className)}
      container
      columns={columns}
    >
      {children}
    </Grid>
  );
}

/**
 * Layout component that must be inside a {@link PanelContentElement} or itself, handling page disposition
 * @param width the width of the column, it depends on the number of columns available
 * @param children the wrapped component
 * @param className optional additional className
 */
export function PanelContentElementColumn({
  width,
  children,
  className,
}: PanelContentElementColumnProps) {
  return (
    <Grid
      item
      xs={width}
      className={classNames(scss.column, className)}
    >
      {children}
    </Grid>
  );
}
