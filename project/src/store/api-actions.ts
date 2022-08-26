import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, State } from '../types/state';
import { Offer, OfferReviews, Offers, Comment } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

import { APIRoute, AppRoute } from '../utils/const';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);

    return data;
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<Offer, number, {
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentOffer',
  async (hotelId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);

    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, number, {
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (hotelId, { extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${hotelId}/nearby`);

    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<OfferReviews, number, {
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (hotelId, { extra: api }) => {
    const { data } = await api.get<OfferReviews>(`${APIRoute.Comments}/${hotelId}`);

    return data;
  },
);

export const sendCommentAction = createAsyncThunk<OfferReviews, { hotelId: number, comment: Comment }, {
  state: State,
  extra: AxiosInstance
}>(
  'data/setComment',
  async ({ hotelId, comment }, { extra: api }) => {
    const { data } = await api.post<OfferReviews>(`${APIRoute.Comments}/${hotelId}`, comment);

    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);

    return data;
  },
);

export const changeFavoriteOfferAction = createAsyncThunk<Offer, { hotelId: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavoriteOffer',
  async ({ hotelId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${hotelId}/${status}`);

    dispatch(fetchFavoriteOffersAction());
    dispatch(fetchOffersAction());

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    await dispatch(fetchFavoriteOffersAction());

    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

    saveToken(data.token);
    dispatch(fetchFavoriteOffersAction());
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
