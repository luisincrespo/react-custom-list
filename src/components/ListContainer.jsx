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
          content={this.props.content}
          onRemove={this.props.onRemove}
          onEdit={this.props.onEdit}
          searchPredicate={this.props.searchPredicate}
          onSearch={this.props.onSearch}
          searchText={this.props.searchText}
          emptyText={this.props.emptyText}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  initialItems: React.PropTypes.arrayOf(React.PropTypes.object),
  content: React.PropTypes.element,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  searchPredicate: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func,
  searchText: React.PropTypes.string,
  emptyText: React.PropTypes.string
};

export default ListContainer;
