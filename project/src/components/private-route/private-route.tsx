import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { Loader } from '../loader/loader';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, authorizationStatus } = props;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
