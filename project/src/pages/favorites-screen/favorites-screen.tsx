import { Favorites } from '../../types/favorites';
import CardList from '../../components/card-list/card-list';

type FavoritesScreenProps = {
  favorites: Favorites
}

export default function FavoritesScreen({ favorites }: FavoritesScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favorites.map(({ id, city, offers }) => (
              <li key={id} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>

                <CardList
                  className="favorites__places"
                  offers={offers}
                  cardType={'favorite'}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
