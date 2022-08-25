import Card from '../card/card';
import { Offers, ClassNameCard, Offer } from '../../types/offer';
import { memo } from 'react';

type CardListProps = {
  offers: Offers;
  className: string;
  cardType: ClassNameCard;
  onMouseEnterCard?: (offer: Offer) => void;
  onMouseLeaveCard?: () => void;
}

function CardList(props: CardListProps): JSX.Element {
  const { offers, className, cardType, onMouseEnterCard, onMouseLeaveCard } = props;

  return (
    <div className={className}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnterCard={() => onMouseEnterCard && onMouseEnterCard(offer)}
          onMouseLeaveCard={() => onMouseLeaveCard && onMouseLeaveCard()}
        />
      ))}
    </div>
  );
}

export default memo(CardList);
