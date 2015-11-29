import Alt from '../Alt';

class ListActions {
  updateItems(items) {
    this.dispatch(items);
  }
}

export default Alt.createActions(ListActions);
