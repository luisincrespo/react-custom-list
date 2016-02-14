import { Promise } from 'es6-promise';

import Alt from '../Alt';

class ListActions {
  setItems(items) {
    return new Promise((resolve) => {
      this.dispatch({ items, resolve });
    });
  }

  addItem(item) {
    this.dispatch(item);
  }

  removeItem(key) {
    this.dispatch(key);
  }

  editItem(key, item) {
    return new Promise((resolve) => {
      this.dispatch({ key, item, resolve });
    });
  }

  searchItem(query, predicate) {
    this.dispatch({ query, predicate });
  }

  clearItems() {
    this.dispatch();
  }
}

export default Alt.createActions(ListActions);
