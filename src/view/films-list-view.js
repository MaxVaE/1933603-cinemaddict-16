import { createElement } from '../render';

const createFilmsTemplate = () => '<section class="films-list"></section>';

export default class FilmsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
