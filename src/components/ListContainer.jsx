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

  // (index: number) => object
  getItem(index) {
    return ListStore.getState().auxItems.get(index).toJS();
  }

  // (item: object) => void
  addItem(item) {
    ListActions.addItem(item);

    this.props.onItemAdd(item);
  }

  // (index: number) => void
  removeItem(index) {
    const item = this.getItem(index);

    ListActions.removeItem(index);

    this.props.onItemRemove(index, item);
  }

  // (index: number, newItem: object) => void
  editItem(index, newItem) {
    const oldItem = this.getItem(index);

    ListActions.editItem(index, newItem);

    this.props.onItemEdit(index, oldItem, newItem);
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
  onItemRemove: React.PropTypes.func, // (index: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (index: number, oldItem: object, newItem: object) => void
  itemsEmptyContent: React.PropTypes.element
};

ListContainer.defaultProps = {
  onItemAdd: () => null
};

export default ListContainer;
