import Card from '../card/card';
import { Offers, ClassNameCard } from '../../types/offer';
import { useState } from 'react';

type CardListProps = {
  offers: Offers;
  className: string;
  cardType: ClassNameCard;
}

export default function CardList({offers, className, cardType}: CardListProps): JSX.Element {
  const [activeOfferId, setActiveOffer] = useState(0);

  return (
    <div className={className} data-active={activeOfferId}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardMouseEnter={() => setActiveOffer(offer.id)}
          cardType={cardType}
        />
      ))}
    </div>
  );
}
