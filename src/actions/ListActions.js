import { Promise } from 'es6-promise';

import Alt from '../Alt';

class ListActions {
  setItems(items) {
    return (dispatch) => new Promise((resolve) => dispatch({ items, resolve }));
  }

  addItem(item) {
    return (dispatch) => new Promise((resolve) => dispatch({ item, resolve }));
  }

  removeItem(key) {
    return (dispatch) => new Promise((resolve) => dispatch({ key, resolve }));
  }

  editItem(key, item) {
    return (dispatch) => new Promise(
      (resolve) => dispatch({ key, item, resolve })
    );
  }

  setItem(key, item) {
    return (dispatch) => new Promise(
      (resolve) => dispatch({ key, item, resolve })
    );
  }

  searchItem(query, predicate) {
    return (dispatch) => new Promise(
      (resolve) => dispatch({ query, predicate, resolve })
    );
  }

  clearItems() {
    return (dispatch) => new Promise((resolve) => dispatch(resolve));
  }
}

export default Alt.createActions(ListActions);
