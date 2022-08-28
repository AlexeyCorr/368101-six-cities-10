import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { changeFavoriteOfferAction } from '../../store/api-actions';
import { getIsAuth } from '../../store/user-process/selectors';
import { AppRoute } from '../../utils/const';

const buttonSize = {
  small: {
    width: 18,
    height: 19
  },
  big: {
    width: 31,
    height: 33
  }
};

const FavoriteStatus = {
  ON: 1,
  OFF: 0
};

type FavoriteButtonProps = {
  id: number,
  isFavorite: boolean,
  blockName: string,
  size?: keyof typeof buttonSize
}

export default function FavoriteButton({ id, size = 'small', isFavorite, blockName }: FavoriteButtonProps) {
  const isAuth = useAppSelector(getIsAuth);
  const [ isLocalFavorite, setIsLocalfavorite ] = useState(isFavorite);

  const dispatch = useAppDispatch();

  const redirectToLigon = () => dispatch(redirectToRoute(AppRoute.Login));

  const handleButtonClick = async () => {
    if (isAuth) {
      await dispatch(changeFavoriteOfferAction({
        hotelId: Number(id),
        status: isLocalFavorite ? FavoriteStatus.OFF : FavoriteStatus.ON
      }));

      setIsLocalfavorite(!isLocalFavorite);
    } else {
      redirectToLigon();
    }
  };

  return (
    <button
      className={`${blockName}__bookmark-button button`}
      type="button"
      onClick={handleButtonClick}
    >
      <svg
        className={`${blockName}__bookmark-icon`}
        width={buttonSize[size].width}
        height={buttonSize[size].height}
        style={isLocalFavorite ? { stroke: '#4481DC', fill: '#4481c3' } : {}}
      >
        <use href="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
