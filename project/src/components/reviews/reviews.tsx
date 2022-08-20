import ReviewsForm from '../reviews-form/reviews-form';
import ReviewList from '../review-list/review-list';
import { OfferReviews } from '../../types/offer';
import { useAppSelector } from '../../hooks';

type ReviewsProps = {
  reviews: OfferReviews;
}

export default function Reviews({ reviews }: ReviewsProps): JSX.Element {
  const { isAuth } = useAppSelector((state) => state);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ReviewList reviews={reviews} />

      {isAuth && <ReviewsForm />}
    </section>
  );
}
