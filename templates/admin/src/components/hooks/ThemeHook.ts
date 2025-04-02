import { getGlobalInstance } from 'plume-ts-di';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';
import { DeclaredRoutePaths, routes } from '../../router/RouterDefinition';

export type PlumeAdminThemeComponents = {
  // eslint-disable-next-line @stylistic/max-len
  [K in keyof PlumeAdminTheme<ReturnType<typeof routes[DeclaredRoutePaths]>>]: PlumeAdminTheme<ReturnType<typeof routes[DeclaredRoutePaths]>>[K]
};

function usePlumeTheme(): PlumeAdminThemeComponents {
  return getGlobalInstance(PlumeAdminTheme);
}

export default usePlumeTheme;
