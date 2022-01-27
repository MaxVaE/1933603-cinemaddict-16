import AbstractView from './abstract-view';

const createSectionFilmsTemplate = () => '<section class="films"></section>';

export default class SectionFilmsView extends AbstractView {
  get template() {
    return createSectionFilmsTemplate();
  }
}
