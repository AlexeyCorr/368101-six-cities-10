import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/reviews';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { getRatingInPercent } from '../../utils/helpers';

import { useAppSelector } from '../../hooks';
import { Loader } from '../../components/loader/loader';
import { store } from '../../store';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import { getComments, getCurrentCity, getCurrentOffer, getNearby } from '../../store/offer-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function OfferScreen(): JSX.Element | null {
  const { id } = useParams();

  const currentOffer = useAppSelector(getCurrentOffer);

  const nearby = useAppSelector(getNearby);
  const comments = useAppSelector(getComments);
  const currentCity = useAppSelector(getCurrentCity);

  const [ selectedOffer, setSelectedOffer ] = useState<Offer | undefined>(currentOffer);
  const [ isRejected, setIsRejected ] = useState(false);

  async function fetchData(hotelId: number) {
    return await Promise.all([
      store.dispatch(fetchCurrentOfferAction(hotelId)),
      store.dispatch(fetchNearbyOffersAction(hotelId)),
      store.dispatch(fetchCommentsAction(hotelId))
    ]);
  }

  useEffect(() => {
    if (id) {
      fetchData(Number(id))
        .then((results) => {
          setIsRejected(results.some(({ meta }) => meta.requestStatus === 'rejected'));
        });
    }
  }, [id]);

  if (isNaN(Number(id)) || isRejected) {
    return <NotFoundScreen />;
  }

  if (!id || !currentOffer) {
    return <Loader />;
  }

  const {
    price,
    title,
    rating,
    type,
    images,
    isFavorite,
    isPremium,
    bedrooms,
    maxAdults,
    goods,
    host,
    description
  } = currentOffer;

  const nearbyOffers = [...nearby, currentOffer];

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.slice(0, 6).map((src: string): JSX.Element => (
              <div
                key={`${src}-${id}`}
                className="property__image-wrapper"
              >
                <img
                  src={src}
                  alt="Photo studio"
                  className="property__image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}

            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>

              <FavoriteButton
                id={Number(id)}
                size="big"
                isFavorite={isFavorite}
                blockName="property"
              />

            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: getRatingInPercent(rating)}} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">€{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&lsquo;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good) => (
                  <li key={`${good}-${id}`} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>

            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt={`Host avatar ${host.name}`} />
                </div>
                <span className="property__user-name">
                  {host.name}
                </span>

                {host.isPro && (
                  <span className="property__user-status">
                    Pro
                  </span>
                )}
              </div>

              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>

            <Reviews hotelId={Number(id)} reviews={comments} />
          </div>
        </div>

        <Map
          city={currentCity}
          offers={nearbyOffers}
          selectedOffer={selectedOffer}
          className="property__map"
        />
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <CardList
            className="near-places__list"
            offers={nearby}
            cardType={'recommend'}
            handleCardMouseEnter={(offer) => setSelectedOffer(offer)}
            handleCardMouseLeave={() => setSelectedOffer(currentOffer)}
          />
        </section>
      </div>
    </main>
  );
}
