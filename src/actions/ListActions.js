import Alt from '../Alt';

class ListActions {
  setItems(items) {
    this.dispatch(items);
  }

  addItem(item) {
    this.dispatch(item);
  }

  removeItem(key) {
    this.dispatch(key);
  }

  editItem(key, item) {
    this.dispatch({ key, item });
  }

  searchItem(query, predicate) {
    this.dispatch({ query, predicate });
  }

  clearItems() {
    this.dispatch();
  }
}

export default Alt.createActions(ListActions);
