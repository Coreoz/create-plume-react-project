import ParametrizedRoute from './ParametrizedRoute';
import NonParametrizedRoute from './UnparametrizedRoute';

type ParametrizedExampleParams = {
  param: string,
};

export default class Routes {
  public static HOME: NonParametrizedRoute = new NonParametrizedRoute('/');

  public static PARAMETRIZED_EXAMPLE: ParametrizedRoute<ParametrizedExampleParams> = new ParametrizedRoute(
    '/parametrized/:param',
  );
}
