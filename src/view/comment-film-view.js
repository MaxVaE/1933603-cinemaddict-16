import AbstractView from './abstract-view';

import { createImage } from '../utils/film';
import { EMOJI } from '../utils/const';
import dayjs from 'dayjs';

function createCommentFilmTemplate(comment) {
  const smiley = {
    src: EMOJI[comment.emotion],
    width: 55,
    height: 55,
    alt: 'emoji',
  };

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      ${createImage(smiley)}
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${parseDate(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
}

function parseDate(date) {
  return dayjs(date).format('YYYY/MM/DD H:mm');
}

export default class CommentFilmView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();

    this.#comment = comment;
  }

  get template() {
    return createCommentFilmTemplate(this.#comment);
  }

  setDeleteCommentHandler(callback) {
    this._callback.deleteComment = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteCommentHandler);
  }

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteComment(this.#comment);
  }
}
