import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';
import { UserData } from '../types/user-data';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const changeCurrentCity = createAction<City>('data/changeCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData>('user/setUserData');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
