import AbstractView from './abstract-view';

function createShowMoreTemplate() {
  return (
    '<button class="films-list__show-more">Show more</button>'
  );
}

export default class ShowMoreView extends AbstractView {
  get template() {
    return createShowMoreTemplate();
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
