import DetailsFilmView from '../view/details-film-view';
import FilmCardView from '../view/film-card-view';

import dayjs from 'dayjs';
import { render, RenderPosition, appendChild, removeChild, remove, replace } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPEN: 'OPEN',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmCardComponent = null;
  #detailsFilmComponent = null;

  #film = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevDetailsFilmComponent = this.#detailsFilmComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#detailsFilmComponent = new DetailsFilmView(film);

    this.#filmCardComponent.setOpenDetailsHandler(this.#handleOpenDetailsFim);
    this.#filmCardComponent.setToggleWatchlistHandler(this.#hanleToggleWatchlist);
    this.#filmCardComponent.setToggleWatchedHandler(this.#hanleToggleWatched);
    this.#filmCardComponent.setToggleFavoriteHandler(this.#hanleToggleFavorite);

    this.#detailsFilmComponent.setCloseDetailsHandler(this.#handleCloseDetailsFilm);
    this.#detailsFilmComponent.setToggleWatchlistHandler(this.#hanleToggleWatchlist);
    this.#detailsFilmComponent.setToggleWatchedHandler(this.#hanleToggleWatched);
    this.#detailsFilmComponent.setToggleFavoriteHandler(this.#hanleToggleFavorite);

    if (prevFilmCardComponent === null || prevDetailsFilmComponent === null) {
      render(this.#filmListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.OPEN) {
      replace(this.#detailsFilmComponent, prevDetailsFilmComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevDetailsFilmComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#detailsFilmComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removeDetailsFilm();
      document.body.className = 'hide-overflow';
    }
  }

  #appendDetailsFilm = () => {
    document.body.className = 'hide-overflow';
    appendChild(this.#filmListContainer, this.#detailsFilmComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#changeMode();
    this.#mode = Mode.OPEN;
  }

  #removeDetailsFilm = () => {
    document.body.classList.remove('hide-overflow');
    removeChild(this.#filmListContainer, this.#detailsFilmComponent, true);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeDetailsFilm();
    }
  }

  #handleOpenDetailsFim = () => {
    this.#appendDetailsFilm();
  }

  #handleCloseDetailsFilm = () => {
    this.#removeDetailsFilm();
  }

  #toggleWatchlist = () => {
    const updateFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    };

    this.#changeData(updateFilm);
  }

  #hanleToggleWatchlist = () => {
    this.#toggleWatchlist();
  }

  #toggleWatched = () => {
    const newWatchingDate = this.#film.userDetails.watchingDate
      ? null
      : dayjs().toDate();

    const updateFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
        watchingDate: newWatchingDate,
      },
    };

    this.#changeData(updateFilm);
  }

  #hanleToggleWatched = () => {
    this.#toggleWatched();
  }

  #toggleFavorite = () => {
    const updateFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    };

    this.#changeData(updateFilm);
  }

  #hanleToggleFavorite = () => {
    this.#toggleFavorite();
  }
}
