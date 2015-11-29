import Immutable from 'immutable';

import Alt from '../Alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.items = Immutable.List();

    this.bindListeners({
      handleUpdateItems: ListActions.UPDATE_ITEMS
    });
  }

  handleUpdateItems(items) {
    this.items = Immutable.fromJS(items)
  }
}

export default Alt.createStore(ListStore, 'ListStore');
