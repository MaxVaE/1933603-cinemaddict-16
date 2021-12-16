import { generationDate, getRandomInteger, generation } from './commonFunc';

const comments = [
  'His ignorance was as remarkable as his knowledge.',
  'Errors are not in the art but in the artificers.',
  'A classic is something that everybody wants to have read and nobody wants to read.',
  'All that is gold does not glitter; not all those that wander are lost.',
  'God never makes errors.',
];

const emotions = [
  './images/emoji/angry.png',
  './images/emoji/puke.png',
  './images/emoji/sleeping.png',
  './images/emoji/smile.png',
];

const authors = [
  'Sir Arthur Ignatius Conan Doyle',
  'John Ronald Reuel Tolkien',
  'Mark Tven',
  'Isaac Newton',
  'Cristoforo Colombo',
];

export function generationComments() {
  const quantityComments = getRandomInteger(0, 5);

  const commentsList = [];
  for (let i = 0; i < quantityComments; i++) {
    commentsList.push({
      emotion: generation(emotions),
      date: generationDate(30, 11, 5),
      author: generation(authors),
      comment: generation(comments),
    });
  }

  return commentsList;
}


