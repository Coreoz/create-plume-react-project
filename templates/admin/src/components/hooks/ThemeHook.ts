import { getGlobalInstance } from 'plume-ts-di';
import { useMemo } from 'react';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';

export type PlumeAdminThemeComponents = {
  [K in keyof PlumeAdminTheme as Capitalize<string & K>]: PlumeAdminTheme[K]
};

function usePlumeTheme(): PlumeAdminThemeComponents {
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);

  return useMemo(
    () => (
      Object.entries(theme)
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        .reduce((acc: PlumeAdminThemeComponents, [key, value]: [string, any]) => {
          const capitalizedKey: string = key.charAt(0).toUpperCase() + key.slice(1);
          acc[capitalizedKey as keyof PlumeAdminThemeComponents] = value;
          return acc;
        }, {} as PlumeAdminThemeComponents)
    ),
    [theme],
  );
}

export default usePlumeTheme;
