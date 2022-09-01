import { OfferReviews } from '../../types/offer';
import { getRatingInPercent } from '../../utils/helpers';

const MAX_COMMENTS = 10;

type ReviewListProps = {
  reviews: OfferReviews;
}

export default function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const sortedReviews = [...reviews].sort((a, b) => {
    const aDate = Date.parse(a.date.toString());
    const bDate = Date.parse(b.date.toString());

    return bDate - aDate;
  });

  return (
    <ul className="reviews__list">
      {sortedReviews.slice(0, MAX_COMMENTS).map((review): JSX.Element => {
        const {comment, date, id, rating, user} = review;
        const commentDate = new Date(date);

        return (
          <li key={id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={user.avatarUrl}
                  width={54}
                  height={54}
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: getRatingInPercent(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time
                className="reviews__time"
                dateTime={commentDate.toLocaleString('ru-Ru')}
              >
                {commentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
