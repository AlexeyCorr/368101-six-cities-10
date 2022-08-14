import { useState } from 'react';
import { Sort } from '../../types';

type SortProps = {
  sorts: Sort[];
  currentSort: Sort;
  onClickSortHandler: (sort: Sort) => void;
}

export default function Sorts({ sorts, currentSort, onClickSortHandler }: SortProps): JSX.Element {
  const [isOpenSort, setIsOpenSort] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">
        Sort by
      </span>

      <span
        className="places__sorting-type" tabIndex={0}
        onClick={() => {
          setIsOpenSort(!isOpenSort);
        }}
      >
        {currentSort.name}

        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpenSort ? 'places__options--opened' : ''}`}>
        {sorts.map((sort) => (
          <li
            key={sort.type}
            className={`places__option ${currentSort.type === sort.type ? 'places__option--active' : ''}`}
            tabIndex={0}
            data-sort-type={sort.type}
            onClick={() => {
              onClickSortHandler(sort);
              setIsOpenSort(false);
            }}
          >
            {sort.name}
          </li>
        ))}
      </ul>
    </form>
  );
}
