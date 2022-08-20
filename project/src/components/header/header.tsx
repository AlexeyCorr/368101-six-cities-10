import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../utils/const';

export default function Header(): JSX.Element {
  const { isAuth, userData } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              to={AppRoute.Root}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth
                ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{
                            backgroundImage: `url(${userData?.avatarUrl})`
                          }}
                        >
                        </div>
                        <span className="header__user-name user__name">
                          {userData?.email}
                        </span>

                        <span className="header__favorite-count">
                          3
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={AppRoute.Root}
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>)
                : (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                    >
                      <span className="header__login">Login</span>
                    </Link>
                  </li>
                )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
