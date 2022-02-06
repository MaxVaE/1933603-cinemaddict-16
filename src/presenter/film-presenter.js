import DetailsFilmView from '../view/details-film-view';
import FilmCardView from '../view/film-card-view';

import dayjs from 'dayjs';
import { render, RenderPosition, appendChild, removeChild, remove, replace } from '../utils/render';
import CommentFilmView from '../view/comment-film-view';
import NewCommentView from '../view/new-comment-view';

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
  #newCommentComponent = null;

  #film = null;
  #comment = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    if (!filmListContainer || !changeData || !changeMode) {
      throw new Error('Can\'t create film');
    }

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
    this.#filmCardComponent.setToggleWatchlistHandler(this.handleToggleWatchlist);
    this.#filmCardComponent.setToggleWatchedHandler(this.handleToggleWatched);
    this.#filmCardComponent.setToggleFavoriteHandler(this.handleToggleFavorite);

    this.#detailsFilmComponent.setCloseDetailsHandler(this.#handleCloseDetailsFilm);
    this.#detailsFilmComponent.setToggleWatchlistHandler(this.handleToggleWatchlist);
    this.#detailsFilmComponent.setToggleWatchedHandler(this.handleToggleWatched);
    this.#detailsFilmComponent.setToggleFavoriteHandler(this.handleToggleFavorite);

    if (prevFilmCardComponent === null || prevDetailsFilmComponent === null) {
      render(this.#filmListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
      this.#renderCommentContainer();
      return;
    }

    if (this.#mode === Mode.OPEN) {
      replace(this.#detailsFilmComponent, prevDetailsFilmComponent);
      this.#renderCommentContainer();
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

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
      document.body.classList.add('hide-overflow');
    }
  }

  #renderCommentContainer = () => {
    this.#renderCommentsFilm();
    this.#renderNewComment();
  }

  #renderCommentsFilm = () => {
    const commentsListSelector = this.#detailsFilmComponent.commentsListSelector;

    this.#film.comments.forEach((comment) => {
      const commentFilmComponent = new CommentFilmView(comment);
      render(commentsListSelector, commentFilmComponent, RenderPosition.BEFOREEND);
    });
  }

  #renderNewComment = () => {
    const newCommentsSelector = this.#detailsFilmComponent.newCommentSelector;

    this.#newCommentComponent = new NewCommentView();

    this.#newCommentComponent.setSubmitHandler(this.handleSubmitComment);

    render(newCommentsSelector, this.#newCommentComponent, RenderPosition.BEFOREEND);
  }

  #appendDetailsFilm = () => {
    document.body.classList.add('hide-overflow');

    appendChild(document.body, this.#detailsFilmComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#changeMode();
    this.#mode = Mode.OPEN;
  }

  #removeDetailsFilm = () => {
    document.body.classList.remove('hide-overflow');

    removeChild(document.body, this.#detailsFilmComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
    this.#newCommentComponent.reset();
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

  handleToggleWatchlist = () => {
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

  handleToggleWatched = () => {
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

  handleToggleFavorite = () => {
    this.#toggleFavorite();
  }

  #submitComment = (comment) => {
    this.#comment = comment;
  }

  handleSubmitComment = (comment) => {
    this.#submitComment(comment);
  }
}
