import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import { makeFakeOffer } from '../../utils/mocks';
import { CITIES } from '../../utils/const';

const mockStore = configureMockStore();

describe('Component: MainScreen', () => {
  it('should rendered MainScreen component, when offers length equal 0', async () => {
    const store = mockStore({
      USER: { isAuth: true },
      DATA: {
        offers: [],
        cities: CITIES,
        currentCity: CITIES[0],
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${CITIES[0].name}`)).toBeInTheDocument();
  });

  it('should rendered offer card', async () => {
    const city = CITIES[0];
    const offer = {
      ...makeFakeOffer(),
      city
    };

    const store = mockStore({
      USER: { isAuth: true },
      DATA: {
        offers: [ offer ],
        cities: CITIES,
        currentCity: CITIES[0],
        isDataLoaded: true
      }
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('should rendered loader', async () => {
    const city = CITIES[0];
    const offer = {
      ...makeFakeOffer(),
      city
    };

    const store = mockStore({
      USER: { isAuth: true },
      DATA: {
        offers: [ offer ],
        cities: CITIES,
        currentCity: CITIES[0],
        isDataLoaded: false
      }
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText(/Идет загрузка данных/i)).toBeInTheDocument();
  });
});
