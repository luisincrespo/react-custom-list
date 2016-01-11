import React from 'react';

import ListActions from '../actions/ListActions';

import DefaultItemContent from './DefaultItemContent';

class Item extends React.Component {
  // () => void
  _onRemove() {
    ListActions.removeItem(this.props.index);

    this.props.onItemRemove(this.props.index, this.props.item.toJS());
  }

  // (newItem: object) => void
  _onEdit(newItem) {
    ListActions.editItem(this.props.index, newItem);

    this.props.onItemEdit(this.props.index, this.props.item.toJS(), newItem);
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
  index: React.PropTypes.number.isRequired,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func, // (index: number, item: object) => void
  onItemEdit: React.PropTypes.func
    // (index: number, oldItem: object, newItem: object) => void
};

Item.defaultProps = {
  itemContent: DefaultItemContent,
  onItemRemove: () => null,
  onItemEdit: () => null
};

export default Item;
