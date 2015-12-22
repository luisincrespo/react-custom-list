import React from 'react';

import ListActions from '../actions/ListActions';

class SearchBox extends React.Component {
  onSearch(event) {
    event.preventDefault();

    ListActions.searchItem(this.query.value, this.props.itemSearchPredicate);

    this.props.onItemSearch(this.query.value);
  }

  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <label>{`${this.props.searchItemsText}: `}</label>
        <input
          type="search"
          onChange={this.onSearch.bind(this)}
          ref={(ref) => this.query = ref}/>
      </form>
    );
  }
}

SearchBox.propTypes = {
  itemSearchPredicate: React.PropTypes.func.isRequired,
  onItemSearch: React.PropTypes.func,
  searchItemsText: React.PropTypes.string
};

SearchBox.defaultProps = {
  onItemSearch: () => null,
  searchItemsText: 'Search'
};

export default SearchBox;
