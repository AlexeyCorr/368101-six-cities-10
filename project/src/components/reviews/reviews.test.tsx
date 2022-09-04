import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Reviews from './reviews';
import { makeFakeComment } from '../../utils/mocks';

const comment = makeFakeComment();

const mockStore = configureMockStore();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: { isAuth: true }
    });

    render(
      <Provider store={store}>
        <Reviews hotelId={1} reviews={[comment]} />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
  });

  it('if isAuth is false the form should not be rendered', () => {
    const store = mockStore({
      USER: { isAuth: false }
    });

    render(
      <Provider store={store}>
        <Reviews hotelId={1} reviews={[comment]} />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).not.toBeInTheDocument();
  });
});
