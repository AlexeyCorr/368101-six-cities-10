import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function DetaultLayout(): JSX.Element {
  const { pathname } = useLocation();
  const mainClass = pathname === '/' ? 'page--main' : '';
  const loginClass = pathname === '/login' ? 'page--gray page--login' : '';

  return (
    <div className={`page ${mainClass} ${loginClass}`}>
      <Header />

      <Outlet />

      { pathname === '/favorites' && <Footer /> }
    </div>
  );
}
