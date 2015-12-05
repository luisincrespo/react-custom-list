import React from 'react';

import ListActions from '../actions/ListActions';

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
  }

  onRemove(event) {
    event.preventDefault();

    ListActions.removeItem(this.props.index);

    this.props.onRemove(this.props.index, this.props.item.toJS());
  }

  onEdit(event) {
    event.preventDefault();

    const item = {
      name: this.name.value
    };

    ListActions.editItem(this.props.index, item);

    this.props.onEdit(this.props.index, this.props.item.toJS(), item);

    this.setState({
      editing: false
    });
  }

  showInput(event) {
    event.preventDefault();

    this.setState({
      editing: true
    });
  }

  hideInput(event) {
    event.preventDefault();

    this.setState({
      editing: false
    });
  }

  render() {
    return (
      <li>
        {this.state.editing ? (
          <form onSubmit={this.onEdit.bind(this)}>
            <input
              type="text"
              defaultValue={this.props.item.get('name')}
              onBlur={this.hideInput.bind(this)}
              ref={(ref) => this.name = ref}
              autoFocus={true}/>
          </form>
        ) : (
          <span>
            {this.props.item.get('name')}
          </span>
        )}
        {this.state.editing ? null : (
          <span>
            <a
              href="#"
              onClick={this.showInput.bind(this)}>
              {this.props.editText}
            </a>
            <a
              href="#"
              onClick={this.onRemove.bind(this)}>
              {this.props.removeText}
            </a>
          </span>
        )}
      </li>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  removeText: React.PropTypes.string,
  onEdit: React.PropTypes.func.isRequired,
  editText: React.PropTypes.string
};

Item.defaultProps = {
  removeText: 'Remove',
  editText: 'Edit'
};

export default Item;
