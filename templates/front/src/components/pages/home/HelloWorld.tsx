import React from 'react';
import { Route } from 'type-route';
import { ROUTE_HELLO, routes } from '../../../router/Router';

import scss from './home.module.scss';

type HelloWorldProps = {
  route: Route<typeof routes[typeof ROUTE_HELLO]>,
};

export default function HelloWorld(
  {
    route,
  }: Readonly<HelloWorldProps>,
) {
  const { name } = route.params;

  return (
    <div id={scss.homeLayout}>
      <h1>{`Hello ${name}`}</h1>
    </div>
  );
}
