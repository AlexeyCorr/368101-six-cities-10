import {render, screen} from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    render(
      <Loader />
    );

    expect(screen.getByLabelText(/Идет загрузка данных/i)).toBeInTheDocument();
  });
});
