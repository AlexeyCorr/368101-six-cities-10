import { City } from '../types/offer';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ClassNameCardType = {
  main: {
    card: 'cities__card',
    image: 'cities__image-wrapper',
    info: ''
  },
  favorite: {
    card: 'favorites__card',
    image: 'favorites__image-wrapper',
    info: 'favorites__card-info'
  },
  recommend: {
    card: 'near-places__card',
    image: 'near-places__image-wrapper',
    info: ''
  }
};

export const MarkerDefault = {
  URL: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  WIDTH: 40,
  HEIGHT: 40
};

export const MarkerCurrent = {
  URL: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  WIDTH: 40,
  HEIGHT: 40
};

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 45.5774872,
      longitude: 9.939068899999999,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5753,
      longitude: 10.0153,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 13
    }
  },
];
