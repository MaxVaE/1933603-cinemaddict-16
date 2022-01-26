import { createElement } from '../render';

function createShowMoreTemplate(quantityFilms) {
  return (
    `${quantityFilms > 5
      ? '<button class="films-list__show-more">Show more</button>'
      : ''}`
  );
}

export default class ShowMoreView {
  #element = null;
  #quantityFilms = null;

  constructor (quantityFilms) {
    this.#quantityFilms = quantityFilms;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createShowMoreTemplate(this.#quantityFilms);
  }

  removeElement() {
    this.#element = null;
  }
}
