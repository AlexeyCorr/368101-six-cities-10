import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import DefaultLayout from '../../layouts/default-layout';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <Routes>
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRoute
            condition='auth'
            authorizationStatus={authorizationStatus}
          >
            <LoginScreen />
          </PrivateRoute>
        }
      />
      <Route path='/' element={<DefaultLayout />}>
        <Route
          index
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.CurrentOffer}
          element={<OfferScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              condition='noAuth'
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Route>
    </Routes>
  );
}
