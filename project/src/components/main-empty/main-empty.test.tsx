import {render, screen} from '@testing-library/react';
import { CITIES } from '../../utils/const';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(
      <MainEmpty city={CITIES[0]} />
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${CITIES[0].name}`)).toBeInTheDocument();
  });
});
