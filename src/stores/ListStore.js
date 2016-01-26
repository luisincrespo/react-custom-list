import Immutable from 'immutable';

import Alt from '../Alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.items = new Immutable.Map();
    this.auxItems = new Immutable.Map();

    this.bindListeners({
      handleUpdateItems: ListActions.UPDATE_ITEMS,
      handleAddItem: ListActions.ADD_ITEM,
      handleRemoveItem: ListActions.REMOVE_ITEM,
      handleEditItem: ListActions.EDIT_ITEM,
      handleSearchItem: ListActions.SEARCH_ITEM
    });

    this._generateKey = this._generateKey.bind(this)
  }

  _generateKey() {
    return this.auxItems.hashCode();
  }

  handleUpdateItems(items) {
    items.map((item) => {
      this.items = this.items.set(
        this._generateKey(), Immutable.fromJS(item)
      );
      this.auxItems = this.auxItems.set(
        this._generateKey(), Immutable.fromJS(item)
      );
    });
  }

  handleAddItem(item) {
    this.items = this.auxItems.set(
      this._generateKey(), Immutable.fromJS(item)
    );
    this.auxItems = this.auxItems.set(
      this._generateKey(), Immutable.fromJS(item)
    );
  }

  handleRemoveItem(key) {
    this.items = this.auxItems.delete(key);
    this.auxItems = this.auxItems.delete(key);
  }

  handleEditItem({ key, item }) {
    this.items = this.auxItems.set(key, Immutable.fromJS(item));
    this.auxItems = this.auxItems.set(key, Immutable.fromJS(item));
  }

  handleSearchItem({ query, predicate }) {
    if (query === '') {
      this.items = this.auxItems.slice();
      return;
    }
    this.items = this.auxItems.filter((item) => predicate(item.toJS(), query));
  }
}

export default Alt.createStore(ListStore, 'ListStore');
