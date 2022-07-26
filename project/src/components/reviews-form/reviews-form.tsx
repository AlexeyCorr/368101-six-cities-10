import { Fragment, ChangeEvent, useState } from 'react';

export default function ReviewsForm(): JSX.Element {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('0');

  const ratings = [
    { count: '5', title: 'perfect' },
    { count: '4', title: 'good' },
    { count: '3', title: 'not bad' },
    { count: '2', title: 'badly' },
    { count: '1', title: 'terribly' }
  ];

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div
        className="reviews__rating-form form__rating"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setRating(evt.target.value);
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
