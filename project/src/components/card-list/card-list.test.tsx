import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { makeFakeOffer } from '../../utils/mocks';
import CardList from './card-list';

const mockStore = configureMockStore();
const store = mockStore({ USER: { isAuth: true } });
const offer = makeFakeOffer();

describe('Component: CardList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardList
            offers={[offer]}
            className="cities__places-list places__list tabs__content"
            cardType="main"
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
