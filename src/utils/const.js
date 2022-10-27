import angry from '../../public/images/emoji/angry.png';
import puke from '../../public/images/emoji/puke.png';
import sleeping from '../../public/images/emoji/sleeping.png';
import smile from '../../public/images/emoji/smile.png';

export const EMOJI = {
  angry,
  puke,
  sleeping,
  smile,
};

export const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
