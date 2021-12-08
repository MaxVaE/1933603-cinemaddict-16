import { menu } from './view/menu';
import { userRank } from './view/user-rank';
import { sectionFilms } from './view/section-films';
import { showMore } from './view/show-more';
import { movieCard } from './view/movie-card';
import { detailsFilm } from './view/details-film';
import { countMoviesInside } from './view/count-movies-inside';

const FILM_COUNT = 20;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function renderTemplate(container, template, place) {
  container.insertAdjacentHTML(place, template);
}

const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, menu(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, userRank(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, sectionFilms(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films');

renderTemplate(siteFilmsElement, showMore(), RenderPosition.AFTERBEGIN);

const siteFilmsListContainerElement = siteFilmsElement.querySelector('.films-list .films-list__container');

for (let i = 0; i < 5; i++) {
  renderTemplate(siteFilmsListContainerElement, movieCard(), RenderPosition.BEFOREEND);
}

const siteFooterElement = document.querySelector('.footer .footer__statistics');
renderTemplate(siteFooterElement, countMoviesInside(), RenderPosition.AFTERBEGIN);

const siteBodyElement = document.querySelector('body');
renderTemplate(siteBodyElement, detailsFilm(FILM_COUNT), RenderPosition.AFTEREND);
