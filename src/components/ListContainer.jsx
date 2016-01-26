import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

import CustomPropTypes from '../utils/propValidators';

import List from './List';

class ListContainer extends React.Component {
  componentDidMount() {
    ListActions.updateItems(this.props.initialItems);
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

  // () => void
  clearItems() {
    const items = this.getItems();

    ListActions.clearItems();

    this.props.onItemsClear(items);
  }

  // (item: object) => void
  addItem(item) {
    ListActions.addItem(item);

    this.props.onItemAdd(item);
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

    ListActions.editItem(key, newItem);

    this.props.onItemEdit(key, oldItem, newItem);
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
  onItemAdd: React.PropTypes.func, // (item: object) => void
  onItemRemove: React.PropTypes.func, // (key: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (key: number, oldItem: object, newItem: object) => void
  onItemsClear: React.PropTypes.func, // (items: arrayOf(object)) => void
  itemsEmptyContent: React.PropTypes.element
};

ListContainer.defaultProps = {
  onItemAdd: () => null,
  onItemsClear: () => null
};

export default ListContainer;
