import ReviewsForm from '../reviews-form/reviews-form';
import ReviewList from '../review-list/review-list';
import { OfferReviews } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-process/selectors';

type ReviewsProps = {
  hotelId: number,
  reviews: OfferReviews;
}

export default function Reviews({ hotelId, reviews }: ReviewsProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ReviewList reviews={reviews} />

      {isAuth && <ReviewsForm hotelId={hotelId} />}
    </section>
  );
}
