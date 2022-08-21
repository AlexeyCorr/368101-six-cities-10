import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, loadComments, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, requireAuthorization, setDataLoadedStatus, setUserData } from './action';
import { getOffersInCurrentCity } from '../utils/helpers';
import { City, Offers, OfferReviews, Offer } from '../types/offer';
import { AuthorizationStatus, CITIES } from '../utils/const';
import { UserData } from '../types/user-data';

type InitalState = {
  currentOffer: Offer | undefined;
  currentCity: City;
  cities: City[];
  offers: Offers;
  favorites: Offers;
  nearby: Offers;
  comments: OfferReviews;
  localOffers: Offers;
  authorizationStatus: AuthorizationStatus;
  isAuth: boolean,
  isDataLoaded: boolean;
  userData: UserData | null
}

const initialState: InitalState = {
  currentOffer: undefined,
  currentCity: CITIES[0],
  cities: CITIES,
  favorites: [],
  nearby: [],
  comments: [],
  offers: [],
  localOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuth: false,
  isDataLoaded: false,
  userData: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      const offers = action.payload;

      if (!offers.length) {
        return;
      }

      state.offers = offers;
      state.localOffers = getOffersInCurrentCity(state.offers, state.currentCity);
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
      state.localOffers = getOffersInCurrentCity(state.offers, state.currentCity);
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isAuth = state.authorizationStatus === AuthorizationStatus.Auth;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
