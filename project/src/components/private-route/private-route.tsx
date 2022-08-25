import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

type PrivateRouteProps = {
  isAuth: boolean,
  children: JSX.Element
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children, isAuth } = props;

  return (
    isAuth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
