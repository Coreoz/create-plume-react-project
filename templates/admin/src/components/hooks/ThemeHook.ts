import { getGlobalInstance } from 'plume-ts-di';
import PlumeAdminTheme from '../../lib/plume-admin-theme/PlumeAdminTheme';

export type PlumeAdminThemeComponents = {
  [K in keyof PlumeAdminTheme]: PlumeAdminTheme[K]
};

function usePlumeTheme(): PlumeAdminThemeComponents {
  return getGlobalInstance(PlumeAdminTheme);
}

export default usePlumeTheme;
