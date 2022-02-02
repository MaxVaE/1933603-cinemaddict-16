export function createImage({ src, width, height, alt = '', className} = {}) {
  const img = new Image(width, height);
  img.src = src;
  img.className = className;
  img.alt = alt;

  return img.outerHTML;
}

export function getRuntime(time) {
  return `${(time / 60).toFixed(0)}h ${time % 60}m`;
}

export function updateItem(items, update) {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
}

export function sortFilmsDate(filmA, filmB) {
  const yearFilmA = filmA.releaseDate.getFullYear();
  const yearFilmB = filmB.releaseDate.getFullYear();

  if (yearFilmA > yearFilmB) {
    return 1;
  }
  else if (yearFilmA < yearFilmB) {
    return -1;
  }

  return 0;
}

export function sortFilmsRating(filmA, filmB) {
  const ratingFilmA = Number(filmA.rating);
  const ratingFilmB = Number(filmB.rating);

  if (ratingFilmA > ratingFilmB) {
    return 1;
  }
  else if (ratingFilmA < ratingFilmB) {
    return -1;
  }

  return 0;
}
