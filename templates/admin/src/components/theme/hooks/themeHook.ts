import { getGlobalInstance } from 'plume-ts-di';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';

function usePlumeTheme(): PlumeAdminTheme {
  return getGlobalInstance(PlumeAdminTheme);
}

export default usePlumeTheme;
