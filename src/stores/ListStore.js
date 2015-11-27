import Immutable from 'immutable';

import Alt from '../Alt';

class ListStore {
  constructor() {
    this.items = Immutable.List.of(
      Immutable.Map({
        name: 'Item 1'
      }), Immutable.Map({
        name: 'Item 2'
      }), Immutable.Map({
        name: 'Item 3'
      })
    );
  }
}

export default Alt.createStore(ListStore, 'ListStore');
