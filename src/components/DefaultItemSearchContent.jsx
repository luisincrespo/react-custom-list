import React from 'react';

class DefaultItemSearchContent extends React.Component {
  _onSearch(event) {
    event.preventDefault();

    this.props.onQueryChange(this.query.value);
  }

  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <label>Search: </label>
        <input
          type="search"
          onChange={this._onSearch.bind(this)}
          ref={(ref) => this.query = ref}/>
      </form>
    );
  }
}

DefaultItemSearchContent.propTypes = {
  onQueryChange: React.PropTypes.func.isRequired
};

export default DefaultItemSearchContent;
