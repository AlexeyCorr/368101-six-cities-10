import { City, Offers } from '../types/offer';

export function getRatingInPercent(rating: number): string {
  return `${rating * 100 / 5}%`;
}

export function getOffersInCurrentCity(offers: Offers, currentCity: City) {
  return offers
    .filter((offer) => offer.city.name === currentCity.name);
}
