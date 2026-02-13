import { routes } from '@components/router/RouterDefinition.ts';
import { useEffect } from 'react';

type NavigateProps = {
  to: ReturnType<typeof routes[unknown]>,
};

function Navigate(
  {
    to,
  }: Readonly<NavigateProps>,
): null {
  useEffect(() => {
    to.push();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- need to run only once on mount
  }, []);

  return null;
}

export default Navigate;
