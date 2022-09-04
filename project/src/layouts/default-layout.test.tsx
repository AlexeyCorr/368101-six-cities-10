import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../components/history-route/history-route';
import DetaultLayout from './default-layout';

const mockStore = configureMockStore();
const store = mockStore({
  USER: { isAuth: true },
  DATA: { favorites: [] }
});

describe('Component: DetaultLayout', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DetaultLayout />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
