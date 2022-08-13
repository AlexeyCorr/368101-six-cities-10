import { City } from '../../types/offer';

type CityListProps = {
  cities: City[];
  currentCity: City;
  onClickCityHandler: (city: City) => void;
}

export default function CityList({ cities, currentCity, onClickCityHandler }: CityListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city: City) => (
            <li key={city.name} className="locations__item">
              <a
                className={`
                  locations__item-link tabs__item
                  ${city.name === currentCity.name ? 'tabs__item--active' : ''}
                `}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onClickCityHandler(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
