import AbstractView from './abstract-view';

import { SORT_TYPE } from '../utils/const';

function createSortTemplate(sortTypeActive) {
  return (
    `<ul class="sort">
      <li>
        <a
          href="#"
          class="sort__button ${checkButtonActive(sortTypeActive, SORT_TYPE.DEFAULT) && 'sort__button--active'}"
          data-sort-type="${SORT_TYPE.DEFAULT}">
            Sort by default
        </a>
      </li>

      <li>
        <a
          href="#"
          class="sort__button ${checkButtonActive(sortTypeActive, SORT_TYPE.DATE) && 'sort__button--active'}"
          data-sort-type="${SORT_TYPE.DATE}">
            Sort by date
        </a>
      </li>

      <li>
        <a
          href="#"
          class="sort__button ${checkButtonActive(sortTypeActive, SORT_TYPE.RATING) && 'sort__button--active'}"
          data-sort-type="${SORT_TYPE.RATING}">
            Sort by rating
        </a>
      </li>
    </ul>`
  );
}

function checkButtonActive(buttonActive, typeSort) {
  return buttonActive === typeSort;
}

export default class SortView extends AbstractView {
  #sortTypeActive = null;

  constructor(sortTypeActive) {
    super();

    this.#sortTypeActive = sortTypeActive;
  }

  get template() {
    return createSortTemplate(this.#sortTypeActive);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
