import { DeclaredRoutePaths, routes } from '@components/router/RouterDefinition.ts';
import { useEffect } from 'react';

type NavigateProps = {
  to: ReturnType<typeof routes[DeclaredRoutePaths]>,
};

function Navigate(
  {
    to,
  }: Readonly<NavigateProps>,
): null {
  useEffect(() => {
    to.push();
  }, []);

  return null;
}

export default Navigate;
