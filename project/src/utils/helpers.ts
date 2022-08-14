import { Sort } from '../types';
import { City, Offer, Offers } from '../types/offer';
import { SortType } from './const';

export function getRatingInPercent(rating: number): string {
  return `${rating * 100 / 5}%`;
}

export function getOffersInCurrentCity(offers: Offers, currentCity: City) {
  return offers
    .filter((offer) => offer.city.name === currentCity.name);
}

export function getSortedOffers(sort: Sort, offers: Offers) {
  offers = [...offers];

  switch(sort.type) {
    case SortType.CHIP:
      return offers.sort((a: Offer, b: Offer) => a.price - b.price);
    case SortType.EXPENSIVE:
      return offers.sort((a: Offer, b: Offer) => b.price - a.price);
    case SortType.RATIND:
      return offers.sort((a: Offer, b: Offer) => b.rating - a.rating);
    default:
      return offers;
  }
}
