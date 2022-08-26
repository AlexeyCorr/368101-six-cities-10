import CardList from '../../components/card-list/card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getFavorites } from '../../store/offer-data/selectors';
import { AppRoute } from '../../utils/const';

export default function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(getFavorites);
  const cities: Set<string> = new Set();
  offers.forEach((offer) => {
    offer.isFavorite && cities.add(offer.city.name);
  });

  const dispatch = useAppDispatch();

  if (!offers.length) {
    dispatch(redirectToRoute(AppRoute.Root));
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {[...cities].map((city) => (
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>

                <CardList
                  className="favorites__places"
                  offers={offers.filter((offer) => offer.city.name === city)}
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
