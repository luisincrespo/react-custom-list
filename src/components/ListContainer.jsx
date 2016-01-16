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

  // (item: object) => void
  addItem(item) {
    ListActions.addItem(item);
  }

  // (index: number) => void
  removeItem(index) {
    ListActions.removeItem(index);
  }

  // (index: number, newItem: object) => void
  editItem(index, newItem) {
    ListActions.editItem(index, newItem);
  }

  render() {
    return (
      <AltContainer store={ListStore}>
        <List
          itemSearchPredicate={this.props.itemSearchPredicate}
          itemSearchContent={this.props.itemSearchContent}
          showItemSearch={this.props.showItemSearch}
          itemContent={this.props.itemContent}
          onItemRemove={this.props.onItemRemove}
          onItemEdit={this.props.onItemEdit}
          onItemSearch={this.props.onItemSearch}
          itemsEmptyContent={this.props.itemsEmptyContent}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  itemSearchPredicate: CustomPropTypes.itemSearchPredicate,
    // (item: object, query: string) => bool
  itemSearchContent: React.PropTypes.element,
  showItemSearch: React.PropTypes.bool,
  itemContent: React.PropTypes.element,
  initialItems: React.PropTypes.arrayOf(React.PropTypes.object),
  onItemRemove: React.PropTypes.func, // (index: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (index: number, oldItem: object, newItem: object) => void
  onItemSearch: React.PropTypes.func, // (query: string) => void
  itemsEmptyContent: React.PropTypes.element
};

export default ListContainer;
