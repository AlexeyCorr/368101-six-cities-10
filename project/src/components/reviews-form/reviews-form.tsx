import { Fragment, ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';

const MIN_LENGTH_COMMENT = 50;

const ratings = [
  { count: 5, title: 'perfect' },
  { count: 4, title: 'good' },
  { count: 3, title: 'not bad' },
  { count: 2, title: 'badly' },
  { count: 1, title: 'terribly' }
];

type ReviewsFormProps = {
  hotelId: string,
}

export default function ReviewsForm({ hotelId }: ReviewsFormProps): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        dispatch(sendCommentAction({ hotelId, comment: { comment: review, rating }}));
        setReview('');
        setRating(0);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div
        className="reviews__rating-form form__rating"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setRating(Number(evt.target.value));
        }}
      >
        {ratings.map(({count, title}) => (
          <Fragment key={count}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={count}
              id={`${count}-stars`}
              type="radio"
              defaultChecked={count === rating}
            />
            <label
              htmlFor={`${count}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={review}
        minLength={MIN_LENGTH_COMMENT}
        onInput={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          setReview(evt.target.value);
        }}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={(review.length < MIN_LENGTH_COMMENT) || !rating}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
