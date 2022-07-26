import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

import { Offers } from '../../types/offer';

import DefaultLayout from '../../layouts/default-layout';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';

import PrivateRoute from '../private-route/private-route';

import { favorites } from './../../mocks/favorites';

type AppProps = {
  offers: Offers
}

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route
            index
            element={<MainScreen offers={offers} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen favorites={favorites} />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
