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
import { sortFilmsDate, sortFilmsRating } from '../utils/film';

const CARD_COUNT_PER_STEP = 5;

export default class FilmListPresenter {
  #filmContainer = null;
  #filmsModel = null;

  #sectionFilmsComponent = new SectionFilmsView();
  #sectionFilmListComponent = new SectionFilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #showMoreComponent = new ShowMoreView();
  #sortComponent = null;

  #filtersMenu = null;
  #renderFilmCount = CARD_COUNT_PER_STEP;
  #filmPresenters = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor(filmContainer, filmsModel) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsDate);
      case SORT_TYPE.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsRating);
    }

    return this.#filmsModel.films;
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
  }

  init = (filtersMenu) => {
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  }

  #clearFilmList = () => {
    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();
    this.#renderFilmCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreComponent);
  }

  #renderMenuNavigation = () => {
    render(this.#filmContainer, new MenuNavigationView(this.#filtersMenu), RenderPosition.BEFOREEND);
  }

  #renderNoFilms = () => {
    render(this.#sectionFilmListComponent, new NoFilmCardsView(this.films.length), RenderPosition.AFTERBEGIN);
  }

  #renderFilmListContainer = () => {
    render(this.#sectionFilmListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);
  }

  #handleShowMoreFilmClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderFilmCount + CARD_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderFilmCount = newRenderedFilmCount;

    if (this.#renderFilmCount >= filmCount) {
      remove(this.#showMoreComponent);
    }
  }

  #renderShowMoreFilm = () => {
    render(this.#sectionFilmListComponent, this.#showMoreComponent, RenderPosition.BEFOREEND);

    this.#showMoreComponent.setShowMoreHandler(this.#handleShowMoreFilmClick);
  }

  #renderFilmList = () => {
    const filmCount = this.films.length;
    const newRenderedTaskCount = Math.min(filmCount, CARD_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderFilmCount, newRenderedTaskCount);

    if (filmCount > 0) {
      this.#renderFilmListContainer();

      this.#renderFilms(films);

      if (filmCount > CARD_COUNT_PER_STEP) {
        this.#renderShowMoreFilm();
      }
    }
  }
}
