import AbstractView from './abstract-view';

function createFilmsTemplate() {
  return (
    `<section class="films-list">
    </section>`
  );
}

export default class SectionFilmListView extends AbstractView {
  get template() {
    return createFilmsTemplate();
  }
}
