import { Link } from 'react-router-dom';

export default function NotFoundScreen(): JSX.Element {
  return (
    <main className="page__main page__main--index container">
      <h1 className="visually-hidden">404 Not Found</h1>

      <video
        src="img/404.mp4"
        autoPlay
        loop
      />

      <Link
        className="locations__item-link"
        style={{
          marginTop: '20px'
        }}
        to="/"
      >
        Вернуться на главную
      </Link>
    </main>
  );
}
