import React from 'react';

import ListActions from '../actions/ListActions';

class Item extends React.Component {
  onRemove(event) {
    event.preventDefault();

    ListActions.removeItem(this.props.index);

    this.props.onRemove(this.props.index);
  }

  render() {
    return (
      <li>
        <span>
          {this.props.item.get('name')}
        </span>
        <a
          href="#"
          onClick={this.onRemove.bind(this)}>
          {this.props.removeText}
        </a>
      </li>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  removeText: React.PropTypes.string
};

Item.defaultProps = {
  removeText: 'Remove'
};

export default Item;
