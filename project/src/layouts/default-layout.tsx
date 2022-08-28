import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { AppRoute } from '../utils/const';

export default function DetaultLayout(): JSX.Element {
  const { pathname } = useLocation();
  const mainClass = pathname === AppRoute.Root ? 'page--main' : '';

  return (
    <div
      className={`page ${mainClass}`}
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr min-content',
      }}
    >
      <Header />

      <Outlet />

      { pathname === AppRoute.Favorites && <Footer /> }
    </div>
  );
}
