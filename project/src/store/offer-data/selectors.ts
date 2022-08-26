import { NameSpace } from '../../utils/const';
import { State } from '../../types/state';
import { City, Offer, OfferReviews, Offers } from '../../types/offer';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.Data].currentOffer;
export const getCities = (state: State): City[] => state[NameSpace.Data].cities;
export const getCurrentCity = (state: State): City => state[NameSpace.Data].currentCity;
export const getFavorites = (state: State): Offers => state[NameSpace.Data].favorites;
export const getNearby = (state: State): Offers => state[NameSpace.Data].nearby;
export const getComments = (state: State): OfferReviews => state[NameSpace.Data].comments;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
