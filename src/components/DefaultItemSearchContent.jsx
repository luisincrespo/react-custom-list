import React from 'react';

class DefaultItemSearchContent extends React.Component {
  constructor(props) {
    super(props);
    this._onSearch = this._onSearch.bind(this);
  }

  _preventDefault(event) {
    event.preventDefault();
  }

  _onSearch(event) {
    event.preventDefault();

    this.props.onQueryChange(this.query.value);
  }

  render() {
    return (
      <form onSubmit={this._preventDefault}>
        <label>Search: </label>
        <input
          type="search"
          onChange={this._onSearch}
          ref={(ref) => { this.query = ref; }}
        />
      </form>
    );
  }
}

DefaultItemSearchContent.propTypes = {
  onQueryChange: React.PropTypes.func.isRequired
};

export default DefaultItemSearchContent;
