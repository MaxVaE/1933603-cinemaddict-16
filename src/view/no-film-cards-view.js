import { createElement } from '../render';

const filterTitle = {
  'All movies': 'There are no movies in our database',
  'Watchlist': 'There are no movies to watch now',
  'History': 'There are no watched movies now',
  'Favorites': 'There are no favorite movies now',
};

function createNoFilmCardsTemplate(quantityFilms, navigationItem) {
  return (
    `${quantityFilms > 0
      ? '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
      : `<h2 class="films-list__title">${filterTitle[navigationItem]}</h2>`
    }`
  );
}

export default class NoFilmCardsView {
  #element = null;
  #quantityFilms = null;
  #navigationItem = null;

  constructor (quantityFilms, navigationItem = 'All movies') {
    this.#quantityFilms = quantityFilms;
    this.#navigationItem = navigationItem;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmCardsTemplate(this.#quantityFilms, this.#navigationItem);
  }

  removeElement() {
    this.#element = null;
  }
}
