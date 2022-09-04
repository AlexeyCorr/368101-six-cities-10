import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Main from './main';
import { makeFakeOffer } from '../../utils/mocks';
import { CITIES } from '../../utils/const';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';

const city = CITIES[0];
const offer = {
  ...makeFakeOffer(),
  city
};

const mockStore = configureMockStore();
const store = mockStore({
  USER: { isAuth: true },
  DATA: {
    offers: [ offer ],
    cities: CITIES,
    currentCity: city,
    isDataLoaded: true
  }
});

describe('Component: Main', () => {
  it('should rendered offer card', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main
            offers={[ offer ]}
            city={city}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
