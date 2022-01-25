import { createElement } from '../render';

function createCountMoviesInsideTemplate(count) {
  return (
    `<p>${count} movies inside</p>`
  );
}

export default class CountMoviesInsideView {
  #element = null;
  #count = null;

  constructor (count) {
    this.#count = count;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCountMoviesInsideTemplate(this.#count);
  }

  removeElement() {
    this.#element = null;
  }
}
