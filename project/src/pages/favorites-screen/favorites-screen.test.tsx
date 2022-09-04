import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import FavoriteScreen from './favorites-screen';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: FavoriteScreen', () => {
  it('should rendered FavoriteEmpry component, when favorites length equal 0', async () => {
    const store = mockStore({
      USER: { isAuth: true },
      DATA: { favorites: [] }
    });

    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should rendered offer card', async () => {
    const store = mockStore({
      USER: { isAuth: true },
      DATA: { favorites: [ makeFakeOffer() ] }
    });

    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
