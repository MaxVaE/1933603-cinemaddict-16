import { createElement } from '../render';

const createSectionFilmsTemplate = () => '<section class="films"></section>';

export default class SectionFilmsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSectionFilmsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
