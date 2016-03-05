import Immutable from 'immutable';

import Alt from '../Alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.items = new Immutable.OrderedMap();
    this.auxItems = new Immutable.OrderedMap();

    this.bindListeners({
      handleSetItems: ListActions.SET_ITEMS,
      handleAddItem: ListActions.ADD_ITEM,
      handleRemoveItem: ListActions.REMOVE_ITEM,
      handleEditItem: ListActions.EDIT_ITEM,
      handleSearchItem: ListActions.SEARCH_ITEM,
      handleClearItems: ListActions.CLEAR_ITEMS
    });

    this._generateKey = this._generateKey.bind(this);
  }

  _generateKey() {
    return this.auxItems.hashCode();
  }

  handleSetItems({ items, resolve }) {
    const oldItems = this.auxItems.slice();
    this.items = this.auxItems.clear();
    this.auxItems = this.auxItems.clear();

    items.forEach((item) => {
      this.items = this.items.set(
        this._generateKey(), Immutable.fromJS(item)
      );
      this.auxItems = this.auxItems.set(
        this._generateKey(), Immutable.fromJS(item)
      );
    });

    resolve({ oldItems, items: this.auxItems.slice() });
  }

  handleAddItem({ item, resolve }) {
    this.items = this.auxItems.set(this._generateKey(), Immutable.fromJS(item));

    this.auxItems = this.auxItems.set(
      this._generateKey(), Immutable.fromJS(item)
    );

    resolve(this.auxItems.last());
  }

  handleRemoveItem({ key, resolve }) {
    this.items = this.auxItems.delete(key);

    const removedItem = this.auxItems.get(key);
    this.auxItems = this.auxItems.delete(key);

    resolve({ removedKey: key, removedItem });
  }

  handleEditItem({ key, item, resolve }) {
    this.items = this.auxItems.update(key, (value) => {
      if (!value) {
        return undefined;
      }
      return value.mergeDeep(item);
    });

    const oldItem = this.auxItems.get(key);
    this.auxItems = this.auxItems.update(key, (value) => {
      if (!value) {
        return undefined;
      }
      return value.mergeDeep(item);
    });

    resolve({ editedKey: key, oldItem, editedItem: this.auxItems.get(key) });
  }

  handleSearchItem({ query, predicate, resolve }) {
    if (query === '') {
      this.items = this.auxItems.slice();
    } else {
      this.items = this.auxItems.filter(
        (item) => predicate(item.toJS(), query)
      );
    }

    resolve(
      {
        searchQuery: query,
        allItems: this.auxItems.slice(),
        filteredItems: this.items.slice()
      }
    );
  }

  handleClearItems(resolve) {
    const items = this.auxItems.slice();
    this.items = this.auxItems.clear();
    this.auxItems = this.auxItems.clear();

    resolve(items);
  }
}

export default Alt.createStore(ListStore, 'ListStore');
