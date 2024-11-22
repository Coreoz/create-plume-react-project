import { observable, Observable, useObservable } from 'micro-observables';
import React from 'react';
import { Route as RouteType } from 'type-route';
import { routes, useRoute, UseRoute } from '../../../../router/Router';

export type RouteItemChildrenProps<T extends keyof typeof routes> = { route: RouteType<typeof routes[T]> };

type RouteProps<T extends keyof typeof routes> = {
  shouldDisplayRoute?: Observable<boolean>,
  route: T,
  Component: (props: RouteItemChildrenProps<T>) => JSX.Element,
};

export default function Route<T extends keyof typeof routes>(
  {
    shouldDisplayRoute = observable(true),
    route: routeName,
    Component,
  }: RouteProps<T>,
) {
  const route: UseRoute = useRoute();
  const shouldDisplayRouteValue: boolean = useObservable(shouldDisplayRoute);

  if (!shouldDisplayRouteValue) {
    return null;
  }

  if (route.name === routeName) {
    return (
      <Component route={route as RouteType<typeof routes[T]>} />
    );
  }

  return null;
}
