import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

import List from './List';

class ListContainer extends React.Component {
  componentDidMount() {
    ListActions.updateItems(this.props.initialItems);
  }

  addItem(item) {
    ListActions.addItem(item);
  }

  removeItem(index) {
    ListActions.removeItem(index);
  }

  editItem(index, newItem) {
    ListActions.editItem(index, newItem);
  }

  render() {
    return (
      <AltContainer store={ListStore}>
        <List
          itemSearchPredicate={this.props.itemSearchPredicate}
          itemSearchContent={this.props.itemSearchContent}
          itemContent={this.props.itemContent}
          onItemRemove={this.props.onItemRemove}
          onItemEdit={this.props.onItemEdit}
          onItemSearch={this.props.onItemSearch}
          searchItemsText={this.props.searchItemsText}
          emptyItemsText={this.props.emptyItemsText}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  itemSearchPredicate: React.PropTypes.func.isRequired,
  itemSearchContent: React.PropTypes.element,
  itemContent: React.PropTypes.element,
  initialItems: React.PropTypes.arrayOf(React.PropTypes.object),
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func,
  onItemSearch: React.PropTypes.func,
  searchItemsText: React.PropTypes.string,
  emptyItemsText: React.PropTypes.string
};

export default ListContainer;
