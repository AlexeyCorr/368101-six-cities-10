import Card from '../card/card';
import { Offers, ClassNameCard, Offer } from '../../types/offer';
import { memo } from 'react';

type CardListProps = {
  offers: Offers;
  className: string;
  cardType: ClassNameCard;
  handleCardMouseEnter?: (offer: Offer) => void;
  handleCardMouseLeave?: () => void;
}

function CardList(props: CardListProps): JSX.Element {
  const { offers, className, cardType, handleCardMouseEnter, handleCardMouseLeave } = props;

  return (
    <div className={className}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default memo(CardList);
