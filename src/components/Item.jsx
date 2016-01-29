import React from 'react';

import ListActions from '../actions/ListActions';

import DefaultItemContent from './DefaultItemContent';

class Item extends React.Component {
  // () => void
  _onRemove() {
    ListActions.removeItem(this.props.itemKey);

    this.props.onItemRemove(this.props.itemKey, this.props.item.toJS());
  }

  // (newItem: object) => void
  _onEdit(newItem) {
    const oldItem = this.props.item.toJS();

    ListActions.editItem(this.props.itemKey, newItem).then((editedItem) => {
      this.props.onItemEdit(
        this.props.itemKey, oldItem, editedItem ? editedItem.toJS() : undefined
      );
    });
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
