import AbstractView from './abstract-view';

function createCountMoviesInsideTemplate(count) {
  return (
    `<p>${count} movies inside</p>`
  );
}

export default class CountMoviesInsideView extends AbstractView {
  #count = null;

  constructor (count) {
    super();

    this.#count = count;
  }

  get template() {
    return createCountMoviesInsideTemplate(this.#count);
  }
}
