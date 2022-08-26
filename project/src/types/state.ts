import { store } from '../store';
import { AuthorizationStatus } from '../utils/const';
import { City, Offer, OfferReviews, Offers } from './offer';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  isAuth: boolean
};

export type OfferData = {
  offers: Offers,
  currentOffer: Offer | undefined,
  cities: City[],
  currentCity: City,
  favorites: Offers,
  nearby: Offers,
  comments: OfferReviews,
  isDataLoaded: boolean
};
