import AbstractObservable from '../utils/abstract-observable';

export default class UserDetailsModel extends AbstractObservable {
  #userDetails = [];

  set userDetails(userDetails) {
    this.#userDetails = [...userDetails];
  }

  get userDetails() {
    return this.#userDetails;
  }
}
