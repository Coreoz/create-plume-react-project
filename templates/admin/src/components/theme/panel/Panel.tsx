import classNames from '@lib/class-names/ClassNames';
import {
  HeadingLevel,
  PanelContentElementColumnProps,
  PanelContentElementProps,
  PanelProps,
  PanelTitleProps,
} from '@lib/plume-admin-theme/panel/PanelProps';
import { Grid, Icon, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'type-route';

import scss from './panel.module.scss';

export function Panel({ className, children }: Readonly<PanelProps>) {
  return (
    <div className={classNames(scss.panel, className)}>
      {children}
    </div>
  );
}

export function PanelSeparator() {
  return <hr />;
}

export function PanelTitle<T extends { link: Link }>(
  {
    children,
    level = 'h1',
    backRoute,
  }: Readonly<PanelTitleProps<T>>,
) {
  const Level: HeadingLevel = level;
  return (
    <div className={scss.panelTitle}>
      {
        backRoute
        && (
          <IconButton
            className={scss.link}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, jsx-a11y/anchor-has-content
            component={(props: any) => <a {...props} />}
            to={backRoute().link}
          >
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

export function PanelContent({ children, className }: Readonly<PanelProps>) {
  return (
    <div className={classNames(scss.panelContent, className)}>
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
}: Readonly<PanelContentElementProps>) {
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
}: Readonly<PanelContentElementColumnProps>) {
  return (
    <Grid
      size={width}
      className={classNames(scss.column, className)}
    >
      {children}
    </Grid>
  );
}
