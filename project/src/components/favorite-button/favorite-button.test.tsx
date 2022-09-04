import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import FavoriteButton from './favorite-button';

const mockStore = configureMockStore();
const store = mockStore({ USER: { isAuth: true } });

describe('Component: FavoriteButton', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <FavoriteButton
          id={1}
          isFavorite={false}
          blockName="place-card"
        />
      </Provider>
    );

    expect(screen.getByLabelText(/Не добавлено в favorite/i)).toBeInTheDocument();
  });
});
