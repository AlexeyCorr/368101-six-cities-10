import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offer';

export const changeCurrentCity = createAction<City>('offers/changeCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
