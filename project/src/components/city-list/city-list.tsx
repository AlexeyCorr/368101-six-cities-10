import { City } from '../../types/offer';

type CityListProps = {
  cities: City[],
  currentCity: City,
  handleCityClick: (city: City) => void,
}

export default function CityList({ cities, currentCity, handleCityClick }: CityListProps): JSX.Element {
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
                  handleCityClick(city);
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
