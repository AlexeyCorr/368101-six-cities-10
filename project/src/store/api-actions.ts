import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { Offer, OfferReviews, Offers } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

import { APIRoute, AppRoute, AuthorizationStatus } from '../utils/const';
import { dropToken, saveToken } from '../services/token';
import {
  loadOffers,
  loadFavoriteOffers,
  loadNearbyOffers,
  loadComments,
  setDataLoadedStatus,
  requireAuthorization,
  redirectToRoute,
  setUserData,
  loadCurrentOffer
} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(false));

    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOffer',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(false));

    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    dispatch(loadCurrentOffer(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(false));

    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${hotelId}/nearby`);
    dispatch(loadNearbyOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(false));

    const { data } = await api.get<OfferReviews>(`${APIRoute.Comments}/${hotelId}`);
    dispatch(loadComments(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(false));

    const { data } = await api.get<Offers>(APIRoute.Favorite);
    dispatch(loadFavoriteOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
