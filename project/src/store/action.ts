import { createAction } from '@reduxjs/toolkit';
import { City, Offer, OfferReviews, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const changeCurrentCity = createAction<City>('data/changeCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadCurrentOffer = createAction<Offer>('data/loadCurrentOffer');

export const loadNearbyOffers = createAction<Offers>('data/loadNearbyOffers');

export const loadFavoriteOffers = createAction<Offers>('data/loadFavoriteOffers');

export const loadComments = createAction<OfferReviews>('data/loadComments');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData>('user/setUserData');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
