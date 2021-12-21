import { createImage, getRuntime } from '../utils';

export function filmCard(film) {
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
