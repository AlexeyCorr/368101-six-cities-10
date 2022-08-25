import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCurrentCity } from '../../store/offer-data/offer-data';
import CityList from '../../components/city-list/city-list';
import Main from '../../components/main/main';
import MainEmpty from '../../components/main-empty/main-empty';
import { Loader } from '../../components/loader/loader';
import { getCities, getCurrentCity, getLoadedDataStatus, getLocalOffers } from '../../store/offer-data/selectors';

export default function MainScreen(): JSX.Element {
  const cities = useAppSelector(getCities);
  const currentCity = useAppSelector(getCurrentCity);
  const localOffers = useAppSelector(getLocalOffers);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  const dispatch = useAppDispatch();
  const isEmpty = !localOffers.length;
  const mainContent = isEmpty
    ? <MainEmpty city={currentCity} />
    : <Main offers={localOffers} city={currentCity} />;

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
        {isDataLoaded
          ? mainContent
          : <Loader />}
      </div>
    </main>
  );
}
