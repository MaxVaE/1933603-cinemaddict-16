import { createElement } from '../render';

function createMenuNavigationTemplate(filtersMenu) {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filtersMenu.watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filtersMenu.history}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtersMenu.favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
}

export default class MenuNavigationView {
  #element = null;
  #filtersMenu = null;

  constructor (filtersMenu) {
    this.#filtersMenu = filtersMenu;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMenuNavigationTemplate(this.#filtersMenu);
  }

  removeElement() {
    this.#element = null;
  }
}
