import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../utils/const';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const { isAuth } = useAppSelector((state) => state);

  return (
    isAuth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
