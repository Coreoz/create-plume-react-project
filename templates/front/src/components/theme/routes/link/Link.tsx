import classNames from '@lib/class-names/ClassNames';
import React, { PropsWithChildren } from 'react';
import { Route } from 'type-route';
import { routes, UseRoute, useRoute } from '../../../../router/Router';

import scss from './link.module.scss';

export type LinkProps = PropsWithChildren<{
  to: Route<typeof routes>,
  disabled?: boolean,
}>;

export default function Link(
  {
    to,
    children,
    disabled = false,
  }: Readonly<LinkProps>,
) {
  const route: UseRoute = useRoute();

  const isRouteActive: boolean = route.name !== false
    && to.name !== false
    && route.name.includes(to.name);

  return (
    <a
      {...to.link}
      className={classNames(
        scss.routerLink,
        {
          [scss.routerLinkActive]: isRouteActive,
          [scss.routerLinkDisabled]: disabled,
        },
      )}
    >
      {children}
    </a>
  );
}
