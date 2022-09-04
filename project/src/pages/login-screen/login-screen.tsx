import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCurrentCity } from '../../store/offer-data/offer-data';
import { AuthData } from '../../types/auth-data';
import { AppRoute } from '../../utils/const';
import { CITIES } from '../../utils/const';
import { getRandomIntInclusive } from '../../utils/helpers';

const ValidPasswortText = {
  number: 'Пароль должен содержать хотябы одно число',
  letter: 'Пароль должен содержать хотябы одну букву'
};

export default function LoginScreen(): JSX.Element {
  const [message, setMessage] = useState('');
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const city = CITIES[getRandomIntInclusive(CITIES.length - 1, 0)];

  const dispatch = useAppDispatch();

  dispatch(changeCurrentCity(city));

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const getIsNotHasChar = (value: string) => {
    const onlyLetter = /[\D]/.test(value);
    const onlyNumber = /[^a-z]/i.test(value);

    return { onlyLetter, onlyNumber };
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const { onlyLetter, onlyNumber } = getIsNotHasChar(passwordRef.current.value);

      if (!onlyLetter || !onlyNumber) {
        setMessage(ValidPasswortText[onlyLetter ? 'number' : 'letter']);
        return;
      }

      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">
                  E-mail
                </label>

                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="login"
                />
              </div>
              <div
                className="login__input-wrapper form__input-wrapper"
                style={{ position: 'relative' }}
              >
                <label className="visually-hidden">
                  Password
                </label>

                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                />

                {message
                  ? (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '8px',
                        fontSize: '11px',
                        color: 'red'
                      }}
                    >
                      {message}
                    </span>
                  )
                  : null}
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>{city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
