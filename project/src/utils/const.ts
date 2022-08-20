import { City } from '../types/offer';
import { Sort } from '../types';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  CurrentOffer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
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
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export const SortType = {
  POPULAR: 'popular',
  CHIP: 'chip',
  EXPENSIVE: 'expensive',
  RATIND: 'rating'
};

export const SORTS: Sort[] = [
  {
    type: SortType.POPULAR,
    name: 'Popular'
  },
  {
    type: SortType.CHIP,
    name: 'Price: low to high'
  },
  {
    type: SortType.EXPENSIVE,
    name: 'Price: high to low'
  },
  {
    type: SortType.RATIND,
    name: 'Top rated first'
  }
];
