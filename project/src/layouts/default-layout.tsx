import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/header/header';
import Footer from '../components/footer/footer';

export default function DetaultLayout(): JSX.Element {
  const { pathname } = useLocation();
  const mainClass = pathname === '/' ? 'page--main' : '';
  const loginClass = pathname === '/login' ? 'page--gray page--login' : '';
  const styles = {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateRows: 'min-content 1fr min-content',
  };

  return (
    <div
      className={`page ${mainClass} ${loginClass}`}
      style={pathname !== '/login' ? styles : {}}
    >
      { pathname !== '/login' && <Header /> }

      <Outlet />

      { pathname === '/favorites' && <Footer /> }
    </div>
  );
}
