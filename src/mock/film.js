import { generateDate, getRandomInteger } from './commonFunctions';
import { nanoid } from 'nanoid';
import { generateComments } from './comment';

import theDanceOfLife from '../../public/images/posters/the-dance-of-life.jpg';
import sagebrushTrail from '../../public/images/posters/sagebrush-trail.jpg';
import theManWithTheGoldenArm from '../../public/images/posters/the-man-with-the-golden-arm.jpg';
import santaClausConquersTheMartians from '../../public/images/posters/santa-claus-conquers-the-martians.jpg';

export function generateFilm() {
  const { title, poster } = generateTitleAndPoster();

  return {
    id: nanoid(),
    title,
    originalTitle: title,
    poster,
    rating: generateRating(),
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    releaseDate: generateDate(30, 11),
    runtime: getRandomInteger(60, 200),
    country: 'USA',
    genres: generateGenres(),
    description: generateDescription(),
    ageRating: getRandomInteger(0, 20),
    comments: generateComments(),
    userDetails: {
      watchlist: getRandomInteger(),
      alreadyWatched: getRandomInteger(),
      watchingDate: generateWatchingDate(),
      favorite: getRandomInteger(),
    },
  };
}

function generateDescription() {
  const discriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomCount = getRandomInteger(1, 5);

  let discription = '';
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, discriptions.length - 1);

    discription += `${discriptions[randomIndex]} `;
  }

  return discription;
}

function generateGenres() {
  const genres = [
    'Drama',
    'Film-Noir',
    'Mystery',
    'Comedy',
    'Western',
  ];

  const randomCount = getRandomInteger(1, 6);

  const genre = new Set();
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    genre.add(genres[randomIndex]);
  }

  return [...genre];
}

function generateTitleAndPoster() {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
  ];

  const posters = [
    theDanceOfLife,
    sagebrushTrail,
    theManWithTheGoldenArm,
    santaClausConquersTheMartians,
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return { title: titles[randomIndex], poster: posters[randomIndex] };
}

function generateRating() {
  return (getRandomInteger(5, 9) + (getRandomInteger(0, 9) / 10)).toFixed(1);
}

function generateWatchingDate() {
  return getRandomInteger() ? generateDate(30, 11, 21) : null;
}
