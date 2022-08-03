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
