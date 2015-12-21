import React from 'react';

import ListActions from '../actions/ListActions';

import DefaultContent from './DefaultContent';

class Item extends React.Component {
  onRemove(event) {
    event.preventDefault();

    ListActions.removeItem(this.props.index);

    this.props.onRemove(this.props.index, this.props.item.toJS());
  }

  onEdit(event, newItem) {
    event.preventDefault();

    ListActions.editItem(this.props.index, newItem);

    this.props.onEdit(this.props.index, this.props.item.toJS(), newItem);
  }

  render() {
    return (
      <this.props.content
        item={this.props.item}
        onRemove={this.onRemove.bind(this)}
        onEdit={this.onEdit.bind(this)}/>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  content: React.PropTypes.element,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func
};

Item.defaultProps = {
  content: DefaultContent,
  onRemove: () => null,
  onEdit: () => null
};

export default Item;
