import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewsForm from './reviews-form';

const mockStore = configureMockStore();

describe('Component: ReviewsForm', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={mockStore({})}>
        <ReviewsForm hotelId={1} />
      </Provider>,
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('review'), 'My review');

    expect(screen.getByDisplayValue(/My review/i)).toBeInTheDocument();
  });
});
