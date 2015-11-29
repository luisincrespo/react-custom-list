import Immutable from 'immutable';

import Alt from '../Alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.items = Immutable.List();

    this.bindListeners({
      handleUpdateItems: ListActions.UPDATE_ITEMS,
      handleAddItem: ListActions.ADD_ITEM,
      handleRemoveItem: ListActions.REMOVE_ITEM
    });
  }

  handleUpdateItems(items) {
    this.items = Immutable.fromJS(items)
  }

  handleAddItem(item) {
    this.items = this.items.push(Immutable.fromJS(item))
  }

  handleRemoveItem(index) {
    this.items = this.items.delete(index)
  }
}

export default Alt.createStore(ListStore, 'ListStore');
