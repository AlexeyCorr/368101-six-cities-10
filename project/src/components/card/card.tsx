import { Link } from 'react-router-dom';
import { Offer, ClassNameCard } from '../../types/offer';
import { AppRoute, ClassNameCardType } from '../../utils/const';
import { getRatingInPercent } from '../../utils/helpers';
import FavoriteButton from '../favorite-button/favorite-button';

type CardPros = {
  offer: Offer,
  cardType: ClassNameCard,
  handleCardMouseEnter?: (offer: Offer) => void,
  handleCardMouseLeave?: () => void,
}

export default function Card(props: CardPros): JSX.Element {
  const { offer, cardType, handleCardMouseEnter, handleCardMouseLeave } = props;
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

  return (
    <article
      className={`${ClassNameCardType[cardType].card} place-card`}
      onMouseEnter={() => handleCardMouseEnter?.(offer)}
      onMouseLeave={handleCardMouseLeave}
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

          <FavoriteButton
            id={id}
            isFavorite={isFavorite}
            blockName="place-card"
          />

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
