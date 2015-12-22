import React from 'react';

import Item from './Item';
import SearchBox from './SearchBox';

class List extends React.Component {
  render() {
    return (
      <div>
        <SearchBox
          onSearch={this.props.onSearch}
          searchText={this.props.searchText}
          ref={(ref) => this.searchBox = ref}/>
        <ul>
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <span>{this.props.emptyText}</span>
          ) : this.props.items.map((item, i) => { // eslint-disable-line
            return (
              <Item
                key={i}
                item={item}
                index={i}
                content={this.props.content}
                onRemove={this.props.onRemove}
                onEdit={this.props.onEdit}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  content: React.PropTypes.element,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  searchText: React.PropTypes.string,
  emptyText: React.PropTypes.string
};

List.defaultProps = {
  emptyText: 'No items.'
};

export default List;
