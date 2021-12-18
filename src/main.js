import { menu } from './view/menu';
import { userRank } from './view/user-rank';
import { sectionFilms } from './view/section-films';
import { showMore } from './view/show-more';
import { filmCard } from './view/film-card';
import { detailsFilm } from './view/details-film';
import { countMoviesInside } from './view/count-movies-inside';
import { generateFilm } from './mock/film';
import { renderTemplate, RenderPosition } from './utils';

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

const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, menu(filtersMenu), RenderPosition.AFTERBEGIN);

if (userDetails.watched > 0) {
  renderTemplate(siteMainElement, userRank(userDetails), RenderPosition.BEFOREEND);
}

renderTemplate(siteMainElement, sectionFilms(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');

renderTemplate(siteFilmsElement, showMore(films.length), RenderPosition.AFTERBEGIN);

const siteFilmsListContainerElement = siteFilmsElement.querySelector('.films-list .films-list__container');

for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmsListContainerElement, filmCard(films[i]), RenderPosition.BEFOREEND);
}

const siteFooterElement = document.querySelector('.footer .footer__statistics');
renderTemplate(siteFooterElement, countMoviesInside(FILM_COUNT), RenderPosition.AFTERBEGIN);

if (films.length > 0) {
  const siteBodyElement = document.querySelector('body');
  renderTemplate(siteBodyElement, detailsFilm(films[0]), RenderPosition.AFTEREND);
}

if (films.length > CARD_COUNT_PER_STEP) {
  let renderFilmsCount = CARD_COUNT_PER_STEP;

  const showMoreButton = siteFilmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmsCount, renderFilmsCount + CARD_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(siteFilmsListContainerElement, filmCard(film), RenderPosition.BEFOREEND));
    renderFilmsCount += CARD_COUNT_PER_STEP;

    if (renderFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
