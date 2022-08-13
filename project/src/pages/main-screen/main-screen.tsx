import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCurrentCity } from '../../store/action';
import CityList from '../../components/city-list/city-list';
import Main from '../../components/main/main';
import MainEmpty from '../../components/main-empty/main-empty';

export default function MainScreen(): JSX.Element {
  const { currentCity, cities, localOffers } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const isEmpty = !localOffers.length;

  return (
    <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>

      <CityList
        currentCity={currentCity}
        cities={cities}
        onClickCityHandler={(city) => {
          dispatch(changeCurrentCity(city));
        }}
      />

      <div className="cities">
        {isEmpty
          ? <MainEmpty city={currentCity} />
          : <Main offers={localOffers} city={currentCity} />}
      </div>
    </main>
  );
}
