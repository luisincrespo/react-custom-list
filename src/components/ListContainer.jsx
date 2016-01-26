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

  // (key: number) => object
  getItem(key) {
    return ListStore.getState().auxItems.get(key).toJS();
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
  itemsEmptyContent: React.PropTypes.element
};

ListContainer.defaultProps = {
  onItemAdd: () => null
};

export default ListContainer;
