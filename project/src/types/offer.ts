import { ClassNameCardType } from '../utils/const';

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
}

type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: number;
}

export type Offers = Offer[];

export type ClassNameCard = keyof typeof ClassNameCardType;

export type Comment = {
  comment: string
  rating: number
}

export type OfferReview = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  }
}

export type OfferReviews = OfferReview[];
