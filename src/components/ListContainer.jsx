import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

import CustomPropTypes from '../utils/propValidators';

import List from './List';

class ListContainer extends React.Component {
  componentDidMount() {
    this.setItems(this.props.initialItems);
  }

  // () => number
  getSize() {
    return ListStore.getState().auxItems.size;
  }

  // () => arrayOf(number)
  getKeys() {
    return ListStore.getState().auxItems.keySeq().toArray();
  }

  // (predicate: (item: object) => bool) => number
  getKey(predicate) {
    return ListStore.getState().auxItems.findKey((item) => {
      return predicate(item.toJS());
    });
  }

  // () => arrayOf(object)
  getItems() {
    return ListStore.getState().auxItems.valueSeq().toJS();
  }

  // (key: number) => object
  getItem(key) {
    const item = ListStore.getState().auxItems.get(key);
    return item ? item.toJS() : undefined;
  }

  // () => object
  getFirstItem() {
    const item = ListStore.getState().auxItems.first();
    return item ? item.toJS() : undefined;
  }

  // () => object
  getLastItem() {
    const item = ListStore.getState().auxItems.last();
    return item ? item.toJS() : undefined;
  }

  // (newItems: arrayOf(object), triggerCallback: bool) => void
  setItems(newItems, triggerCallback = true) {
    const oldItems = this.getItems();

    ListActions.setItems(newItems).then((items) => {
      if (triggerCallback) {
        this.props.onItemsSet(oldItems, items.valueSeq().toJS());
      }
    });
  }

  // () => void
  clearItems() {
    const items = this.getItems();

    ListActions.clearItems();

    this.props.onItemsClear(items);
  }

  // (item: object) => void
  pushItem(item) {
    ListActions.addItem(item);

    this.props.onItemPush(item);
  }

  // (item: object) => void
  unshiftItem(item) {
    let items = this.getItems();
    items = [item].concat(items);

    this.setItems(items, false);

    this.props.onItemUnshift(item);
  }

  // (key: number, newItem: object) => void
  addItemBelow(key, newItem) {
    const existingItem = this.getItem(key);
    const keys = this.getKeys();
    let items = this.getItems();

    items = items
      .slice(0, keys.indexOf(key) + 1)
      .concat([newItem])
      .concat(items.slice(keys.indexOf(key) + 1));

    this.setItems(items, false);

    this.props.onItemAddBelow(key, existingItem, newItem);
  }

  // (key: number, newItem: object) => void
  addItemAbove(key, newItem) {
    const existingItem = this.getItem(key);
    const keys = this.getKeys();
    let items = this.getItems();

    items = items
      .slice(0, keys.indexOf(key) < 0 ? 0 : keys.indexOf(key))
      .concat([newItem])
      .concat(items.slice(keys.indexOf(key) < 0 ? 0 : keys.indexOf(key)));

    this.setItems(items, false);

    this.props.onItemAddAbove(key, existingItem, newItem);
  }

  // (key: number) => void
  removeItem(key) {
    const item = this.getItem(key);

    ListActions.removeItem(key);

    this.props.onItemRemove(key, item);
  }

  // (key: number, newItem: object) => void
  editItem(key, newItem) {
    const oldItem = this.getItem(key);

    ListActions.editItem(key, newItem).then((editedItem) => {
      this.props.onItemEdit(
        key, oldItem, editedItem ? editedItem.toJS() : undefined
      );
    });
  }

  render() {
    return (
      <AltContainer store={ListStore}>
        <List
          showItemSearch={this.props.showItemSearch}
          itemSearchContent={this.props.itemSearchContent}
          itemSearchPredicate={this.props.itemSearchPredicate}
          onItemSearch={this.props.onItemSearch}
          itemContent={this.props.itemContent}
          onItemRemove={this.props.onItemRemove}
          onItemEdit={this.props.onItemEdit}
          itemsEmptyContent={this.props.itemsEmptyContent}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  initialItems: React.PropTypes.arrayOf(React.PropTypes.object),
  showItemSearch: React.PropTypes.bool,
  itemSearchContent: React.PropTypes.element,
  itemSearchPredicate: CustomPropTypes.itemSearchPredicate,
    // (item: object, query: string) => bool
  onItemSearch: React.PropTypes.func, // (query: string) => void
  itemContent: React.PropTypes.element,
  onItemsSet: React.PropTypes.func,
    // (oldItems: arrayOf(object), newItems: arrayOf(object)) => void
  onItemsClear: React.PropTypes.func, // (items: arrayOf(object)) => void
  onItemPush: React.PropTypes.func, // (item: object) => void
  onItemUnshift: React.PropTypes.func, // (item: object) => void
  onItemAddBelow: React.PropTypes.func,
    // (key: number, existingItem: object, newItem: object) => void
  onItemAddAbove: React.PropTypes.func,
    // (key: number, existingItem: object, newItem: object) => void
  onItemRemove: React.PropTypes.func, // (key: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (key: number, oldItem: object, editedItem: object) => void
  itemsEmptyContent: React.PropTypes.element
};

ListContainer.defaultProps = {
  onItemsSet: () => null,
  onItemsClear: () => null,
  onItemPush: () => null,
  onItemUnshift: () => null,
  onItemAddBelow: () => null,
  onItemAddAbove: () => null,
  onItemRemove: () => null,
  onItemEdit: () => null
};

export default ListContainer;
