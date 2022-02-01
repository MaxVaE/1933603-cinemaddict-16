import SectionFilmsView from '../view/section-films-view';
import SectionFilmListView from '../view/section-film-list-view';
import NoFilmCardsView from '../view/no-film-cards-view';
import FilmListContainerView from '../view/film-list-container-view';
import ShowMoreView from '../view/show-more-view';
import FilmPresenter from './film-presenter';

import { render, RenderPosition, remove } from '../utils/render';
import { updateItem } from '../utils/film';

const CARD_COUNT_PER_STEP = 5;


export default class FilmListPresenter {
  #filmContainer = null;

  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmListComponent = new SectionFilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreComponent = new ShowMoreView();

  #films = [];
  #renderFilmsCount = CARD_COUNT_PER_STEP;
  #filmPresenters = new Map();

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#filmContainer, this.#sectionFilmsComponent, RenderPosition.BEFOREEND);
    render(this.#sectionFilmsComponent, this.#sectionFilmListComponent, RenderPosition.AFTERBEGIN);

    this.#renderSectionFilms();
  }

  #handleModeChange = () => {
    this.#filmPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleFilmCardChange = (updateFilm) => {
    updateItem(this.#films, updateFilm);
    this.#filmPresenters.get(updateFilm.id).init(updateFilm);
  }

  #renderSectionFilms = () => {
    this.#renderNoFilms();
    this.#renderFilmList();
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent, this.#handleFilmCardChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilms = (from, to) => {
    for (let i = from; i < to; i++) {
      this.#renderFilm(this.#films[i]);
    }
  }

  #clearFilmList = () => {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderFilmsCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreComponent);
  }

  #renderNoFilms = () => {
    render(this.#sectionFilmListComponent, new NoFilmCardsView(this.#films.length), RenderPosition.AFTERBEGIN);
  }

  #renderFilmListContainer = () => {
    render(this.#sectionFilmListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);
  }

  #handleShowMoreFilmClick = () => {
    this.#renderFilms(this.#renderFilmsCount, this.#renderFilmsCount + CARD_COUNT_PER_STEP);
    this.#renderFilmsCount += CARD_COUNT_PER_STEP;

    if (this.#renderFilmsCount >= this.#films.length) {
      remove(this.#showMoreComponent);
    }
  }

  #renderShowMoreFilm = () => {
    render(this.#sectionFilmListComponent, this.#showMoreComponent, RenderPosition.BEFOREEND);

    this.#showMoreComponent.setShowMoreHandler(this.#handleShowMoreFilmClick);
  }

  #renderFilmList = () => {
    const lengthFilms = this.#films.length;

    if (lengthFilms > 0) {
      this.#renderFilmListContainer();

      this.#renderFilms(0, Math.min(lengthFilms, CARD_COUNT_PER_STEP));

      if (lengthFilms > CARD_COUNT_PER_STEP) {
        this.#renderShowMoreFilm();
      }
    }
  }
}
