import { createElement } from '../render';

const createFilmsContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
