import {render, screen} from '@testing-library/react';
import CityList from './city-list';
import { CITIES } from '../../utils/const';

describe('Component: CityList', () => {
  it('should render correctly', () => {
    render(
      <CityList
        cities={CITIES}
        currentCity={CITIES[0]}
        handleCityClick={jest.fn()}
      />
    );

    expect(screen.getByText(CITIES[0].name)).toBeInTheDocument();
  });
});
