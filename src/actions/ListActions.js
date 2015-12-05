import Alt from '../Alt';

class ListActions {
  updateItems(items) {
    this.dispatch(items);
  }

  addItem(item) {
    this.dispatch(item)
  }

  removeItem(index) {
    this.dispatch(index)
  }

  editItem(index, item) {
    this.dispatch({index, item})
  }
}

export default Alt.createActions(ListActions);
