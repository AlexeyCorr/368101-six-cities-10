import { createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../utils/const';
import { OfferData } from '../../types/state';
import { changeFavoriteOfferAction, fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction, sendCommentAction } from '../api-actions';

const initialState: OfferData = {
  offers: [],
  currentOffer: undefined,
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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
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
        const index = state.offers.findIndex((item) => item.id === action.payload.id);

        state.offers = [
          ...state.offers.slice(0, index),
          action.payload,
          ...state.offers.slice(index + 1)
        ];
        state.favorites = state.offers.filter((offer) => offer.isFavorite);
      });
  }
});

export const { changeCurrentCity } = offerData.actions;
