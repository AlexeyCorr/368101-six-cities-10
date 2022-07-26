import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type CardPros = {
  offer: Offer;
  isFavorite: boolean;
  onCardMouseEnter: () => void
}

export default function Card({ offer, isFavorite, onCardMouseEnter }: CardPros): JSX.Element {
  const { id, price, title, rating, type, isPremium, isBookmark, pictures } = offer;

  return (
    <article
      className={`${isFavorite ? 'favorites__card' : 'cities__card'} place-card`}
      onMouseEnter={onCardMouseEnter}
    >
      {
        isPremium
          ? <div className="place-card__mark"><span>Premium</span></div>
          : null
      }

      <div className={`${isFavorite ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={pictures[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${isFavorite ? 'favorites__image-wrapper' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isBookmark ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
