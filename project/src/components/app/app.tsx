import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-process/selectors';
import DefaultLayout from '../../layouts/default-layout';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-route/history-route';

import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route
            index
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.CurrentOffer}
            element={<OfferScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute isAuth={isAuth}>
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
    </HistoryRouter>
  );
}

export default App;
