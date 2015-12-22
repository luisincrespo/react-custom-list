import React from 'react';

import ListActions from '../actions/ListActions';

import DefaultContent from './DefaultContent';

class Item extends React.Component {
  onRemove(event) {
    event.preventDefault();

    ListActions.removeItem(this.props.index);

    this.props.onItemRemove(this.props.index, this.props.item.toJS());
  }

  onEdit(event, newItem) {
    event.preventDefault();

    ListActions.editItem(this.props.index, newItem);

    this.props.onItemEdit(this.props.index, this.props.item.toJS(), newItem);
  }

  render() {
    return (
      <this.props.itemContent
        item={this.props.item}
        onRemove={this.onRemove.bind(this)}
        onEdit={this.onEdit.bind(this)}/>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func
};

Item.defaultProps = {
  itemContent: DefaultContent,
  onItemRemove: () => null,
  onItemEdit: () => null
};

export default Item;
