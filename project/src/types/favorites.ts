import { Offers } from './offer';

export type Favorite = {
  id: number,
  city: string,
  offers: Offers,
}

export type Favorites = Favorite[];
