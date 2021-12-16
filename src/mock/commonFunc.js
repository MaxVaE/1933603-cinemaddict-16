import dayjs from 'dayjs';

export function generation(data) {
  const randomIndex = getRandomInteger(0, data.length - 1);

  return data[randomIndex];
}

export function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function generationDate(day, month, year) {
  return dayjs().add(getRandomInteger(-day, day), 'd')
    .add(getRandomInteger(-month, month), 'M')
    .add(getRandomInteger(-year), 'y')
    .toDate();
}
