import { createImage } from '../utils/film';
import dayjs from 'dayjs';

import angry from '../../public/images/emoji/angry.png';
import puke from '../../public/images/emoji/puke.png';
import sleeping from '../../public/images/emoji/sleeping.png';
import smile from '../../public/images/emoji/smile.png';
import AbstractView from './abstract-view';

const emoji = {
  angry,
  puke,
  sleeping,
  smile,
};

function createCommentFilmTemplate(comment) {

  const smiley = {
    src: emoji[comment.emotion],
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

  constructor (comment) {
    super();

    this.#comment = comment;
  }

  get template() {
    return createCommentFilmTemplate(this.#comment);
  }
}
