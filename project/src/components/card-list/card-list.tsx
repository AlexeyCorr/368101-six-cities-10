import Card from '../card/card';
import { Offers, ClassNameCard, Offer } from '../../types/offer';

type CardListProps = {
  offers: Offers;
  className: string;
  cardType: ClassNameCard;
  onMouseEnterCardHandler?: (offer: Offer) => void;
  onMouseLeaveCardHandler?: () => void;
}

export default function CardList(props: CardListProps): JSX.Element {
  const { offers, className, cardType, onMouseEnterCardHandler, onMouseLeaveCardHandler } = props;

  return (
    <div className={className}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnterCardHandler={() => onMouseEnterCardHandler && onMouseEnterCardHandler(offer)}
          onMouseLeaveCardHandler={() => onMouseLeaveCardHandler && onMouseLeaveCardHandler()}
        />
      ))}
    </div>
  );
}
