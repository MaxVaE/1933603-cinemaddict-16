import { EMOJI } from '../utils/const';
import SmartView from './smart-view';

const emojiList = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

function createNewCommentTemplate({ checkedEmoji, isChecked, text }) {
  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
      ${checkedEmoji
      ? `<img src="${EMOJI[checkedEmoji]}" width="55" height="55" alt="emoji-smile"></img>`
      : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiList.map((emoji) => getEmojiElement(emoji, isChecked[emoji])).join('')}
      </div>
    </div>`
  );

  function getEmojiElement(emoji, isCheckedEmoji) {
    return (
      `<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${emoji}"
        value="${emoji}"
        ${isCheckedEmoji ? 'checked' : ''}>

      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="${EMOJI[emoji]}" width="30" height="30" alt="emoji">
      </label>`
    );
  }
}

export default class NewCommentView extends SmartView {
  #isSubmitHandle = false;

  constructor () {
    super();

    this._data = NewCommentView.parseCommentToData();
    this.#setInnerHandlers();
  }

  get template() {
    return createNewCommentTemplate(this._data);
  }

  reset = () => {
    this.updateData({
      update: NewCommentView.parseCommentToData(),
    });
  }

  #EmojiSmileHandler = (evt) => {
    evt.preventDefault();

    const checkedEmoji = evt.target.value;
    const isChecked = {};

    emojiList.forEach((emoji) => {
      isChecked[emoji] = emoji === checkedEmoji;
    });

    this.updateData({
      update: {
        checkedEmoji,
        isChecked,
      },
    });
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.submitComment);
  }

  #setInnerHandlers = () => {
    emojiList.forEach((emoji) => {
      this.element.querySelector(`#emoji-${emoji}`)
        .addEventListener('click', this.#EmojiSmileHandler);
    });

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
  }

  setSubmitHandler = (callback) => {
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#submitHandler);
    this._callback.submitComment = callback;
  }

  #submitHandler = (evt) => {
    if (evt.key === 'Shift') {
      this.#isSubmitHandle = true;
      return;
    }

    if (evt.key === 'Enter' && this.#isSubmitHandle && this._data.text) {
      evt.preventDefault();
      this._callback.submitComment(NewCommentView.parseDataToComment(this._data));
      return;
    }

    this.#isSubmitHandle = false;
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      update: {
        text: evt.target.value,
      },
      justDataUpdating: true,
    });
  }

  static parseCommentToData = (comment = { checkedEmoji: null, text: '' }) => {
    const isChecked = {};

    emojiList.forEach((emoji) => {
      isChecked[emoji] = emoji === comment.checkedEmoji;
    });

    return ({
      ...comment,
      isChecked,
    });
  }

  static parseDataToComment = (data) => {
    const comment = {...data};

    if (!comment.checkedEmoji) {
      comment.checkedEmoji = 'smile';
    }

    comment.emotion = EMOJI[comment.checkedEmoji];
    comment.comment = comment.text;
    comment.date = new Date();

    delete comment.text;
    delete comment.checkedEmoji;
    delete comment.isChecked;

    return comment;
  }
}
