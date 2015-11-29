import Alt from '../Alt';

class ListActions {
  updateItems(items) {
    this.dispatch(items);
  }

  addItem(item) {
    this.dispatch(item)
  }
}

export default Alt.createActions(ListActions);
