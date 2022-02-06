import AbstractView from './abstract-view';

import dayjs from 'dayjs';
import { createImage, getRuntime } from '../utils/film';

function createDetailsFilmTemplate(film) {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              ${createImage({src: film.poster, className: 'film-details__poster-img'})}

              <p class="film-details__age">${film.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.title}</h3>
                  <p class="film-details__title-original">Original: ${film.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${getReleaseDate(film.releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getRuntime(film.runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                  ${getGenresElem(film.genres)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
              ${film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button${checkActiveControlButton(film.userDetails.watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button${checkActiveControlButton(film.userDetails.alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button${checkActiveControlButton(film.userDetails.favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

            <ul class="film-details__comments-list">
            </ul>

          </section>
        </div>
      </form>
    </section>`
  );
}

function getReleaseDate(date) {
  return dayjs(date).format('DD MMMM YYYY');
}

function getGenresElem(genres) {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join('');
}

function checkActiveControlButton(active) {
  return active ? ' film-details__control-button--active' : '';
}

export default class DetailsFilmView extends AbstractView {
  #film = null;

  constructor (film) {
    super();

    this.#film = film;
  }

  get template() {
    return createDetailsFilmTemplate(this.#film);
  }

  get commentsListSelector() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get newCommentSelector() {
    return this.element.querySelector('.film-details__comments-wrap');
  }

  setCloseDetailsHandler(callback) {
    this._callback.closeDetails = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeDetailsHandler);
  }

  #closeDetailsHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeDetails();
  }

  setToggleWatchlistHandler(callback) {
    this._callback.toggleWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#toggleWatchlistHandler);
  }

  #toggleWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleWatchlist();
  }

  setToggleWatchedHandler(callback) {
    this._callback.toggleWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#toggleWatchedHandler);
  }

  #toggleWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleWatched();
  }

  setToggleFavoriteHandler(callback) {
    this._callback.toggleFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#toggleFavoriteHandler);
  }

  #toggleFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.toggleFavorite();
  }
}
