import MenuNavigationView from './view/menu-navigation-view';
import SortView from './view/sort-view';
import UserRankView from './view/user-rank-view';
import SectionFilmsView from './view/section-films-view';
import ShowMoreView from './view/show-more-view';
import FilmCardView from './view/film-card-view';
import DetailsFilmView from './view/details-film-view';
import CountMoviesInsideView from './view/count-movies-inside-view';
import FilmsListView from './view/films-list-view';
import FilmsListContainerView from './view/films-list-container-view';
import NoFilmCardsView from './view/no-film-cards-view';

import { generateFilm } from './mock/film';
import { render, RenderPosition } from './render';

const FILM_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;
const films = [];

for (let i = 0; i < FILM_COUNT; i++) {
  films.push(generateFilm());
}

const userDetails = {
  watched: 0,
  totalDuration: 0,
  genres: new Map(),
};

const filtersMenu = {
  watchlist: 0,
  history: 0,
  favorites: 0,
};

films.forEach((film) => {
  if (film.userDetails.watchlist) {
    filtersMenu.watchlist++;
  }

  if (film.userDetails.alreadyWatched) {
    filtersMenu.history++;

    userDetails.watched++;
    userDetails.totalDuration += film.runtime;

    for (const genre of film.genres) {
      if (!userDetails.genres.has(genre)) {
        userDetails.genres.set(genre, 1);
        break;
      }
      userDetails.genres.set(genre, userDetails.genres.get(genre) + 1);
    }
  }

  if (film.userDetails.favorite) {
    filtersMenu.favorites++;
  }
});

function renderFilms(filmListElement, film) {
  const filmComponent = new FilmCardView(film);
  const detailsFilmComponent = new DetailsFilmView(film);

  function openDetailsFilm() {
    document.body.className = 'hide-overflow';
    filmListElement.appendChild(detailsFilmComponent.element);
  }

  function closeDetailsFilm() {
    document.body.classList.remove('hide-overflow');
    filmListElement.removeChild(detailsFilmComponent.element);
  }

  function onEscKeyDown(evt) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeDetailsFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }

  filmComponent.element.querySelector('.film-card__comments').addEventListener('click', () => {
    openDetailsFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  detailsFilmComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    closeDetailsFilm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(filmListElement, filmComponent.element, RenderPosition.BEFOREEND);
}

function renderListFilms(listFilmsContainer, listFilms) {
  const sectionFilmsComponent = new SectionFilmsView();
  render(listFilmsContainer, sectionFilmsComponent.element, RenderPosition.BEFOREEND);

  const filmsListComponent = new FilmsListView(listFilms.length);
  render(sectionFilmsComponent.element, filmsListComponent.element, RenderPosition.AFTERBEGIN);

  render(filmsListComponent.element, new NoFilmCardsView(listFilms.length).element, RenderPosition.AFTERBEGIN);


  if (listFilms.length > 0) {
    const filmsListContainerComponent = new FilmsListContainerView();
    render(filmsListComponent.element, filmsListContainerComponent.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(listFilms.length, CARD_COUNT_PER_STEP); i++) {
      renderFilms(filmsListContainerComponent.element, listFilms[i]);
    }

    const showMoreComponent = new ShowMoreView(listFilms.length);
    render(filmsListComponent.element, showMoreComponent.element, RenderPosition.BEFOREEND);

    if (listFilms.length > CARD_COUNT_PER_STEP) {
      let renderFilmsCount = CARD_COUNT_PER_STEP;

      showMoreComponent.element.addEventListener('click', (evt) => {
        evt.preventDefault();
        listFilms
          .slice(renderFilmsCount, renderFilmsCount + CARD_COUNT_PER_STEP)
          .forEach((film) => renderFilms(filmsListContainerComponent.element, film));
        renderFilmsCount += CARD_COUNT_PER_STEP;

        if (renderFilmsCount >= listFilms.length) {
          showMoreComponent.element.remove();
        }
      });
    }
  }
}

const siteMainElement = document.querySelector('.main');

render(siteMainElement, new SortView(filtersMenu).element, RenderPosition.AFTERBEGIN);
render(siteMainElement, new MenuNavigationView(filtersMenu).element, RenderPosition.AFTERBEGIN);

if (userDetails.watched > 0) {
  render(siteMainElement, new UserRankView(userDetails).element, RenderPosition.BEFOREEND);
}

renderListFilms(siteMainElement, films);

const siteFooterElement = document.querySelector('.footer__statistics');
render(siteFooterElement, new CountMoviesInsideView(FILM_COUNT).element, RenderPosition.AFTERBEGIN);
