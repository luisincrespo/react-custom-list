import React from 'react';

import ListActions from '../actions/ListActions';

class NewItem extends React.Component {
  onAdd(event) {
    event.preventDefault();

    const item = {
      name: this.name.value
    };

    ListActions.addItem(item);

    this.props.onAdd(item);

    this.name.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onAdd.bind(this)}>
        <input
          type="text"
          ref={(ref) => this.name = ref}/>
        <button>{this.props.addText}</button>
      </form>
    );
  }
}

NewItem.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  addText: React.PropTypes.string
};

NewItem.defaultProps = {
  addText: 'Add'
};

export default NewItem;
