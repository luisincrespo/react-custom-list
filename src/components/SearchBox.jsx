import React from 'react';

import ListActions from '../actions/ListActions';

class SearchBox extends React.Component {
  onSearch(event) {
    event.preventDefault();

    ListActions.searchItem(this.query.value);

    this.props.onSearch(this.query.value);
  }

  clearQuery() {
    this.query.value = '';

    ListActions.searchItem(this.query.value);
  }

  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <label>{`${this.props.searchText}: `}</label>
        <input
          type="search"
          onChange={this.onSearch.bind(this)}
          ref={(ref) => this.query = ref}/>
      </form>
    );
  }
}

SearchBox.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  searchText: React.PropTypes.string
};

SearchBox.defaultProps = {
  searchText: 'Search'
};

export default SearchBox;
