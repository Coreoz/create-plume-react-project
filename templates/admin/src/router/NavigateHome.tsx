import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import { ROUTE_HOME, routes } from './Router';

export default function NavigateHome() {
  useOnComponentMounted(() => {
    routes[ROUTE_HOME]().push();
  });

  return null;
}
