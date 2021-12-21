export function showMore(quantityFilms) {
  return (
    `<section class="films-list">
      ${quantityFilms > 0
      ? '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
      : '<h2 class="films-list__title">There are no movies in our database</h2>'
    }

      <div class="films-list__container"></div>

      ${quantityFilms > 5 ? '<button class="films-list__show-more">Show more</button>' : ''}
    </section>`
  );
}
