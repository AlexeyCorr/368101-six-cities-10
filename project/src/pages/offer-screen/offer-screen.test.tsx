import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import OfferScreen from './offer-screen';
import { makeFakeOffer } from '../../utils/mocks';
import { CITIES } from '../../utils/const';

const mockStore = configureMockStore();

describe('Component: OfferScreen', () => {
  it('should render NotFoundScreen', async () => {
    const store = mockStore({
      USER: { isAuth: true },
      DATA: {
        offers: [],
        currentOffer: makeFakeOffer(),
        cities: CITIES,
        currentCity: CITIES[0],
        favorites: [],
        nearby: [],
        comments: [],
        isDataLoaded: false
      }
    });

    const history = createMemoryHistory();
    history.push('/offer/wqeasd');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
