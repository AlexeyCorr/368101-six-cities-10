import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import { Loader } from '../loader/loader';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  condition: string,
  children: JSX.Element
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, authorizationStatus, condition } = props;

  const route = condition === 'auth' ? AppRoute.Root : AppRoute.Login;
  const status = condition === 'auth' ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  return (
    authorizationStatus === status
      ? children
      : <Navigate to={route} />
  );
}
