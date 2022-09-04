import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Card from './card';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const store = mockStore({ USER: { isAuth: true } });
const offer = makeFakeOffer();

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card offer={offer} cardType="main" />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
