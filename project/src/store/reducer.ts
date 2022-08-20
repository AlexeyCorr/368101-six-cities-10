import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, loadOffers, requireAuthorization, setDataLoadedStatus, setUserData } from './action';
import { getOffersInCurrentCity } from '../utils/helpers';
import { City, Offers } from '../types/offer';
import { AuthorizationStatus, CITIES } from '../utils/const';
import { UserData } from '../types/user-data';

type InitalState = {
  currentCity: City;
  cities: City[];
  offers: Offers;
  localOffers: Offers;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  userData: UserData | null
}

const initialState: InitalState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: [],
  localOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
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
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
      state.localOffers = getOffersInCurrentCity(state.offers, state.currentCity);
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
