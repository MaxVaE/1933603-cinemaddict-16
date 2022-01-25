import dayjs from 'dayjs';

export function getRandomItemFromArray(array) {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
}

export function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function generateDate(day, month, year = 20) {
  return dayjs()
    .day(getRandomInteger(0, day))
    .month(getRandomInteger(0, month))
    .year(getRandomInteger(1900, 2000 + year))
    .toDate();
}
