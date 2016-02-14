import React from 'react';

import ListActions from '../actions/ListActions';

import DefaultItemContent from './DefaultItemContent';

class Item extends React.Component {
  // () => void
  _onRemove() {
    ListActions.removeItem(this.props.itemKey).then(
      ({ removedKey, removedItem }) => {
        this.props.onItemRemove(
          removedKey, removedItem ? removedItem.toJS() : undefined
        );
      }
    );
  }

  // (newItem: object) => void
  _onEdit(newItem) {
    ListActions.editItem(this.props.itemKey, newItem).then(
      ({ editedKey, oldItem, editedItem }) => {
        this.props.onItemEdit(
          editedKey,
          oldItem ? oldItem.toJS() : undefined,
          editedItem ? editedItem.toJS() : undefined
        );
      }
    );
  }

  render() {
    return (
      <this.props.itemContent
        item={this.props.item}
        onRemove={this._onRemove.bind(this)}
        onEdit={this._onEdit.bind(this)}/>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  itemKey: React.PropTypes.number.isRequired,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func, // (key: number, item: object) => void
  onItemEdit: React.PropTypes.func
    // (key: number, oldItem: object, editedItem: object) => void
};

Item.defaultProps = {
  itemContent: DefaultItemContent,
  onItemRemove: () => null,
  onItemEdit: () => null
};

export default Item;
