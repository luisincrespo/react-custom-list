import { Promise } from 'es6-promise';

import Alt from '../Alt';

class ListActions {
  setItems(items) {
    return new Promise((resolve) => {
      this.dispatch({ items, resolve });
    });
  }

  addItem(item) {
    return new Promise((resolve) => {
      this.dispatch({ item, resolve });
    });
  }

  removeItem(key) {
    return new Promise((resolve) => {
      this.dispatch({ key, resolve });
    });
  }

  editItem(key, item) {
    return new Promise((resolve) => {
      this.dispatch({ key, item, resolve });
    });
  }

  searchItem(query, predicate) {
    return new Promise((resolve) => {
      this.dispatch({ query, predicate, resolve });
    });
  }

  clearItems() {
    return new Promise((resolve) => {
      this.dispatch(resolve);
    })
  }
}

export default Alt.createActions(ListActions);
