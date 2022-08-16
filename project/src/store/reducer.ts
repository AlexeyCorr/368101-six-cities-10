import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, loadOffers, setDataLoadedStatus } from './action';
import { getOffersInCurrentCity } from '../utils/helpers';
import { City, Offers } from '../types/offer';
import { CITIES } from '../utils/const';

type InitalState = {
  currentCity: City;
  cities: City[];
  offers: Offers;
  localOffers: Offers;
  isDataLoaded: boolean;
}

const initialState: InitalState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: [],
  localOffers: [],
  isDataLoaded: false
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
    });
});