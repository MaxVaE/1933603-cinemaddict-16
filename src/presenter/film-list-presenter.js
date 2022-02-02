import FilmListContainerView from '../view/film-list-container-view';
import SectionFilmListView from '../view/section-film-list-view';
import MenuNavigationView from '../view/menu-navigation-view';
import SectionFilmsView from '../view/section-films-view';
import NoFilmCardsView from '../view/no-film-cards-view';
import ShowMoreView from '../view/show-more-view';
import FilmPresenter from './film-presenter';
import SortView from '../view/sort-view';

import { render, RenderPosition, remove, replace } from '../utils/render';
import { SORT_TYPE } from '../utils/const';
import { updateItem, sortFilmsDate, sortFilmsRating } from '../utils/film';

const CARD_COUNT_PER_STEP = 5;

export default class FilmListPresenter {
  #filmContainer = null;

  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmListComponent = new SectionFilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreComponent = new ShowMoreView();
  #sortComponent = null;

  #films = [];
  #filtersMenu = null;
  #renderFilmsCount = CARD_COUNT_PER_STEP;
  #filmPresenters = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedFilms = [];

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  init = (films, filtersMenu) => {
    this.#films = [...films];
    this.#sourcedFilms = [...films];
    this.#filtersMenu = filtersMenu;

    this.#renderMenuNavigation();
    this.#renderSort();

    render(this.#filmContainer, this.#sectionFilmsComponent, RenderPosition.BEFOREEND);
    render(this.#sectionFilmsComponent, this.#sectionFilmListComponent, RenderPosition.AFTERBEGIN);

    this.#renderSectionFilms();
  }

  #handleModeChange = () => {
    this.#filmPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleFilmCardChange = (updateFilm) => {
    this.#films = updateItem(this.#films, updateFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updateFilm);
    this.#filmPresenters.get(updateFilm.id).init(updateFilm);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DATE:
        this.#films.sort(sortFilmsDate);
        break;
      case SORT_TYPE.RATING:
        this.#films.sort(sortFilmsRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();

    this.#renderSort();
  }

  #renderSort = () => {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    if (prevSortComponent === null) {
      render(this.#filmContainer, this.#sortComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
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

  #renderMenuNavigation = () => {
    render(this.#filmContainer, new MenuNavigationView(this.#filtersMenu), RenderPosition.BEFOREEND);
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
