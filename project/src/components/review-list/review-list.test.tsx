import {render, screen} from '@testing-library/react';
import ReviewList from './review-list';
import { makeFakeComment } from '../../utils/mocks';

const comment = makeFakeComment();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <ReviewList reviews={[comment]} />
    );

    expect(screen.getByText(comment.comment)).toBeInTheDocument();
  });
});
