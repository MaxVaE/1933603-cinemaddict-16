import { generateDate, getRandomInteger, getRandomItemFromArray } from './commonFunctions';

const comments = [
  'His ignorance was as remarkable as his knowledge.',
  'Errors are not in the art but in the artificers.',
  'A classic is something that everybody wants to have read and nobody wants to read.',
  'All that is gold does not glitter; not all those that wander are lost.',
  'God never makes errors.',
];

const emotions = [
  'angry',
  'puke',
  'sleeping',
  'smile',
];

const authors = [
  'Sir Arthur Ignatius Conan Doyle',
  'John Ronald Reuel Tolkien',
  'Mark Tven',
  'Isaac Newton',
  'Cristoforo Colombo',
];

export function generateComments() {
  const quantityComments = getRandomInteger(0, 5);

  const commentsList = [];
  for (let i = 0; i < quantityComments; i++) {
    commentsList.push({
      emotion: getRandomItemFromArray(emotions),
      date: generateDate(30, 11),
      author: getRandomItemFromArray(authors),
      comment: getRandomItemFromArray(comments),
    });
  }

  return commentsList;
}
