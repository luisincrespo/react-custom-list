import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

import List from './List';

class ListContainer extends React.Component {
  componentDidMount() {
    ListActions.updateItems(this.props.initialItems)
  }

  render() {
    return (
      <AltContainer store={ListStore}>
        <List
          onAdd={this.props.onAdd}
          addText={this.props.addText}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  initialItems: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string
    })
  ),
  onAdd: React.PropTypes.func.isRequired,
  addText: React.PropTypes.string
};

export default ListContainer;
