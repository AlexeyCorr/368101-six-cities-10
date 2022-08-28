import { useState, useEffect, useCallback } from 'react';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import Sorts from '../sorts/sorts';
import { Offers, City, Offer } from '../../types/offer';
import { SORTS } from '../../utils/const';
import { getSortedOffers } from '../../utils/helpers';

type MainProps = {
  offers: Offers,
  city: City,
}

export default function Main({ offers, city }: MainProps): JSX.Element {
  const [currentSort, setCurrentSort] = useState(SORTS[0]);
  const [sortedOffers, setSortedOffers] = useState(offers);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleCardMouseEnter = useCallback((offer: Offer) => setSelectedOffer(offer), []);
  const handleCardMouseLeave = useCallback(() => setSelectedOffer(undefined), []);

  useEffect(() => {
    setSortedOffers(getSortedOffers(currentSort, offers));
  }, [currentSort, offers]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">
          Places
        </h2>

        <b className="places__found">
          {offers.length} {offers.length > 1 ? 'places' : 'place'} to stay in {city.name}
        </b>

        <Sorts
          sorts={SORTS}
          currentSort={currentSort}
          handleSortClick={setCurrentSort}
        />

        <CardList
          className="cities__places-list places__list tabs__content"
          offers={sortedOffers}
          cardType={'main'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      </section>

      <div className="cities__right-section">
        <Map
          city={city}
          offers={offers}
          selectedOffer={selectedOffer}
          className="cities__map"
        />
      </div>
    </div>
  );
}
