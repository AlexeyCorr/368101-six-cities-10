import {render, screen} from '@testing-library/react';
import Sorts from './sorts';
import { SORTS } from '../../utils/const';

describe('Component: Sorts', () => {
  it('should render correctly', () => {
    render(
      <Sorts
        sorts={SORTS}
        currentSort={SORTS[0]}
        handleSortClick={jest.fn()}
      />
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
