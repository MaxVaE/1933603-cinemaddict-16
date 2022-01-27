import { createImage } from '../utils/film';
import AbstractView from './abstract-view';

function createUserRankTemplate(userDetails) {

  const avatar = {
    src: 'images/bitmap@2x.png',
    width: 35,
    height: 35,
    alt: 'Avatar',
    className: 'statistic__img',
  };

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        ${createImage(avatar)}
        <span class="statistic__rank-label">${determineRank(userDetails.watched)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${userDetails.watched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${(userDetails.totalDuration / 60).toFixed(0)} <span class="statistic__item-description">h</span> ${userDetails.totalDuration % 60} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getTopGenre(userDetails.genres)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
}

function getTopGenre(genres) {
  let topGenre = '';
  for (const genre of genres) {
    if (!genres.has(topGenre)) {
      topGenre = genre[0];
    }

    if (genre[1] > genres.get(topGenre)) {
      topGenre = genre[0];
    }
  }
  return topGenre;
}

function determineRank(watched) {
  if (watched === 0) { return ''; }

  const rank = [
    'Novice',
    'Fan',
    'Movie buff',
  ];

  let rankIndex = 0;

  if (watched > 20) {
    rankIndex = 2;
  }
  else if (watched > 10) {
    rankIndex = 1;
  }

  return rank[rankIndex];
}

export default class UserRankView extends AbstractView {
  #userDetails = null;

  constructor (userDetails) {
    super();

    this.#userDetails = userDetails;
  }

  get template() {
    return createUserRankTemplate(this.#userDetails);
  }
}
