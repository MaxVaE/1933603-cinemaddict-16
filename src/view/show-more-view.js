import AbstractView from './abstract-view';

function createShowMoreTemplate(quantityFilms) {
  return (
    `${quantityFilms > 5
      ? '<button class="films-list__show-more">Show more</button>'
      : ''}`
  );
}

export default class ShowMoreView extends AbstractView {
  #quantityFilms = null;

  constructor (quantityFilms) {
    super();

    this.#quantityFilms = quantityFilms;
  }

  get template() {
    return createShowMoreTemplate(this.#quantityFilms);
  }

  setShowMoreHandler = (callback) => {
    this._callback.showMore = callback;
    this.element.addEventListener('click', this.#showMoreHandler);
  }

  #showMoreHandler = (evt) => {
    evt.preventDefault();
    this._callback.showMore();
  }
}
