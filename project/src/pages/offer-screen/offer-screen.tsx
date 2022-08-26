import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/reviews';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import { getRatingInPercent } from '../../utils/helpers';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Loader } from '../../components/loader/loader';
import { store } from '../../store';
import { changeFavoriteOfferAction, fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import { getComments, getCurrentCity, getCurrentOffer, getNearby } from '../../store/offer-data/selectors';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../utils/const';
import { getIsAuth } from '../../store/user-process/selectors';

export default function OfferScreen(): JSX.Element | null {
  const { id } = useParams();

  async function fetchData(hotelId: number) {
    await Promise.all([
      store.dispatch(fetchCurrentOfferAction(hotelId)),
      store.dispatch(fetchNearbyOffersAction(hotelId)),
      store.dispatch(fetchCommentsAction(hotelId))
    ]);
  }

  useEffect(() => {
    if (id) {
      fetchData(Number(id));
    }
  }, [id]);

  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(getCurrentOffer);
  const isAuth = useAppSelector(getIsAuth);
  const nearby = useAppSelector(getNearby);
  const comments = useAppSelector(getComments);
  const currentCity = useAppSelector(getCurrentCity);

  const [ selectedOffer, setSelectedOffer ] = useState<Offer | undefined>(currentOffer);

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

  const setFavorite = async () => {
    await dispatch(changeFavoriteOfferAction({ hotelId: Number(id), status: isFavorite ? 0 : 1 }));
    dispatch(fetchCurrentOfferAction(Number(id)));
  };

  const redirectToLigon = () => dispatch(redirectToRoute(AppRoute.Login));
  const onCardClick = isAuth ? setFavorite : redirectToLigon;

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

              <button
                className="property__bookmark-button button"
                type="button"
                onClick={onCardClick}
              >
                <svg
                  className="property__bookmark-icon place-card__bookmark-icon"
                  width={31}
                  height={33}
                  style={isFavorite ? { stroke: '#4481DC', fill: '#4481c3' } : {}}
                >
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
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
            onMouseEnterCard={(offer) => setSelectedOffer(offer)}
            onMouseLeaveCard={() => setSelectedOffer(currentOffer)}
          />
        </section>
      </div>
    </main>
  );
}
