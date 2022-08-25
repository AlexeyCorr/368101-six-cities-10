import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteOfferAction } from '../../store/api-actions';
import { Offer, ClassNameCard } from '../../types/offer';
import { AppRoute, ClassNameCardType } from '../../utils/const';
import { getRatingInPercent } from '../../utils/helpers';

type CardPros = {
  offer: Offer;
  cardType: ClassNameCard;
  onMouseEnterCard: () => void;
  onMouseLeaveCard: () => void;
}

export default function Card(props: CardPros): JSX.Element {
  const { offer, cardType, onMouseEnterCard, onMouseLeaveCard } = props;
  const {
    id,
    price,
    title,
    rating,
    type,
    isPremium,
    isFavorite,
    previewImage
  } = offer;

  const dispatch = useAppDispatch();

  return (
    <article
      className={`${ClassNameCardType[cardType].card} place-card`}
      onMouseEnter={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
    >
      {
        isPremium
          ? <div className="place-card__mark"><span>Premium</span></div>
          : null
      }

      <div className={`${ClassNameCardType[cardType].image} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${ClassNameCardType[cardType].info} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => dispatch(changeFavoriteOfferAction({ hotelId: id, status: isFavorite ? 0 : 1 }))}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
