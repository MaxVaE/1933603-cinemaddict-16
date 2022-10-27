import CountMoviesInsideView from './view/count-movies-inside-view';

import { generateFilm } from './mock/film';
import { render, RenderPosition } from './utils/render';
import FilmListPresenter from './presenter/film-list-presenter';
import FlimsModel from './model/films-model';
// import UserDetailsModel from './model/user-details-model';

const FILM_COUNT = 20;
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

const filmsModel = new FlimsModel();
filmsModel.films = films;

// const userDetailsModel = new UserDetailsModel();
// userDetailsModel.userDetails = userDetails;

const siteMainElement = document.querySelector('.main');

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel);
filmListPresenter.init(filtersMenu);

const siteFooterElement = document.querySelector('.footer__statistics');
render(siteFooterElement, new CountMoviesInsideView(FILM_COUNT), RenderPosition.AFTERBEGIN);
