import Card from '../card/card';
import { Offers } from '../../types/offer';

type CardListProps = {
  offers: Offers,
  className: string,
  isFavorite: boolean
}

export default function CardList({offers, className, isFavorite}: CardListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardMouseEnter={() => console.log(1)} // eslint-disable-line no-console
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
}
