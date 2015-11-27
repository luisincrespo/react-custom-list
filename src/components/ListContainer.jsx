import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListStore from '../stores/ListStore';

import List from './List';

class ListContainer extends React.Component {
  render() {
    return (
      <AltContainer store={ListStore}>
        <List/>
      </AltContainer>
    );
  }
}

export default ListContainer;
