import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import LoginScreen from './login-screen';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'test@test.com');
    await userEvent.type(screen.getByTestId('password'), 'qwe123');

    expect(screen.getByDisplayValue(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/qwe123/i)).toBeInTheDocument();
  });
});
