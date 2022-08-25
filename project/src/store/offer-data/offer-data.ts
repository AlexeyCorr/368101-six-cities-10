import { createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../utils/const';
import { OfferData } from '../../types/state';
import { changeFavoriteOfferAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, sendCommentAction } from '../api-actions';
import { getOffersInCurrentCity } from '../../utils/helpers';

const initialState: OfferData = {
  offers: [],
  currentOffer: undefined,
  localOffers: [],
  cities: CITIES,
  currentCity: CITIES[0],
  favorites: [],
  nearby: [],
  comments: [],
  isDataLoaded: false
};

export const offerData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCurrentCity: (state, action) => {
      state.currentCity = action.payload;
      state.localOffers = getOffersInCurrentCity(state.offers, state.currentCity);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.localOffers = getOffersInCurrentCity(state.offers, state.currentCity);
        state.isDataLoaded = true;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(changeFavoriteOfferAction.fulfilled, (state, action) => {
        const index = state.localOffers.findIndex((item) => item.id === action.payload.id);

        state.localOffers = [
          ...state.localOffers.slice(0, index),
          action.payload,
          ...state.localOffers.slice(index + 1)
        ];
        state.favorites.push(action.payload);
      });
  }
});

export const { changeCurrentCity } = offerData.actions;
