import AbstractView from './abstract-view';

const createFilmsContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainerView extends AbstractView {
  get template() {
    return createFilmsContainerTemplate();
  }
}
