import { createImage, getRuntime } from '../utils/film';
import AbstractView from './abstract-view';

function createFilmCardTemplate(film) {
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${film.title}</h3>
        <p class="film-card__rating">${film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${film.releaseDate.getFullYear()}</span>
          <span class="film-card__duration">${getRuntime(film.runtime)}</span>
          <span class="film-card__genre">${film.genres[0]}</span>
        </p>
        ${createImage({ src: film.poster, className: 'film-card__poster' })}
        <p class="film-card__description">${film.description}</p>
        <span class="film-card__comments">${film.comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist${checkActiveControlsItem(film.userDetails.watchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched${checkActiveControlsItem(film.userDetails.alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite${checkActiveControlsItem(film.userDetails.favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
}

function checkActiveControlsItem(active) {
  return active ? ' film-card__controls-item--active' : '';
}

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor (film) {
    super();

    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setOpenDetailsHandler(callback) {
    this._callback.openDetails = callback;
    this.element.querySelector('.film-card__comments').addEventListener('click', this.#openDetailsHandler);
  }

  #openDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.openDetails();
  }

  setToggleWatchlistHandler(callback) {
    this._callback.toggleWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#toggleWatchlistHandler);
  }

  #toggleWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleWatchlist();
  }

  setToggleWatchedHandler(callback) {
    this._callback.toggleWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#toggleWatchedHandler);
  }

  #toggleWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleWatched();
  }

  setToggleFavoriteHandler(callback) {
    this._callback.toggleFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#toggleFavoriteHandler);
  }

  #toggleFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleFavorite();
  }
}
