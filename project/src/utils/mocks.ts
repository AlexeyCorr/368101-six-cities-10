import { datatype, address, image, name, date } from 'faker';
import { Offer, OfferReview, OfferReviews, Offers } from '../types/offer';

export const makeFakeOffer = (): Offer => ({
  city: {
    name: address.city(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: 13,
    }
  },
  previewImage: image.abstract(),
  images: [image.abstract(), image.abstract(), image.abstract(), image.abstract()],
  title: name.findName(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 0, max: 5 }),
  type: datatype.string(),
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
  price: datatype.number(),
  goods: [datatype.string(), datatype.string(), datatype.string()],
  host: {
    id: datatype.number(),
    name: datatype.string(),
    isPro: datatype.boolean(),
    avatarUrl: image.abstract(),
  },
  description: datatype.string(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 13,
  },
  id: datatype.number(),
});

export const makeFakeOffers = (): Offers => new Array(4).fill(makeFakeOffer());

export const makeFakeComment = (): OfferReview => ({
  comment: datatype.string(),
  date: date.past(),
  id: datatype.number(),
  rating: datatype.number({ min: 0, max: 5 }),
  user: {
    avatarUrl: image.abstract(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: datatype.string(),
  }
});

export const makeFakeComments = (): OfferReviews => new Array(5).fill(makeFakeComment());
