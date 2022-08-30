import { changeCurrentCity, offerData } from './offer-data';
import { makeFakeOffer, makeFakeOffers, makeFakeComments } from '../../utils/mocks';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearbyOffersAction, fetchOffersAction } from '../api-actions';
import { OfferData } from '../../types/state';
import { CITIES } from '../../utils/const';

const offer = [makeFakeOffer()];
const offers = [makeFakeOffers()];
const comments = makeFakeComments();

describe('Reducer: offerData', () => {
  let state: OfferData;

  beforeEach(() => {
    state = {
      offers: [],
      currentOffer: undefined,
      cities: CITIES,
      currentCity: CITIES[0],
      favorites: [],
      nearby: [],
      comments: [],
      isDataLoaded: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offerData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should load hotels', () => {
    expect(offerData.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: offers }))
      .toEqual({
        offers,
        currentOffer: undefined,
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: [],
        nearby: [],
        comments: [],
        isDataLoaded: true
      });
  });

  it('should load current hotel', () => {
    expect(offerData.reducer(state, { type: fetchCurrentOfferAction.fulfilled.type, payload: offer }))
      .toEqual({
        offers: [],
        currentOffer: offer,
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: [],
        nearby: [],
        comments: [],
        isDataLoaded: true
      });
  });

  it('should change current city', () => {
    expect(offerData.reducer(state, { type: changeCurrentCity.type, payload: CITIES[1] }))
      .toEqual({
        offers: [],
        currentOffer: undefined,
        cities: CITIES,
        currentCity: CITIES[1],
        favorites: [],
        nearby: [],
        comments: [],
        isDataLoaded: false
      });
  });

  it('should load favorite hotels', () => {
    expect(offerData.reducer(state, { type: fetchFavoriteOffersAction.fulfilled.type, payload: offers }))
      .toEqual({
        offers: [],
        currentOffer: undefined,
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: offers,
        nearby: [],
        comments: [],
        isDataLoaded: false
      });
  });

  it('should load nearby hotels', () => {
    expect(offerData.reducer(state, { type: fetchNearbyOffersAction.fulfilled.type, payload: offers }))
      .toEqual({
        offers: [],
        currentOffer: undefined,
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: [],
        nearby: offers,
        comments: [],
        isDataLoaded: true
      });
  });

  it('should load comments', () => {
    expect(offerData.reducer(state, { type: fetchCommentsAction.fulfilled.type, payload: comments }))
      .toEqual({
        offers: [],
        currentOffer: undefined,
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: [],
        nearby: [],
        comments,
        isDataLoaded: true
      });
  });
});
